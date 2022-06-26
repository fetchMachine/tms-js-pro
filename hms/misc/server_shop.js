import { createServer, Model, belongsTo, Factory, Response } from "miragejs"
import { faker } from '@faker-js/faker';
import * as yup from 'yup';
import orderBy from 'lodash.orderby';
import * as jose from 'jose'

const APP_CONFIG = {
    DEFAULT_RESPONSE_DELAY: 0,
    TOKEN_TTL: '24h',
    USE_AUTH_CHECK: false,
    LOG_BE_ERRORS: true,
}

const prodcutSchema = yup.object().shape({
    good: yup.object().shape({
        categoryTypeId: yup.string().required(),
        description: yup.string().required(),
        id: yup.string().required(),
        img: yup.string().required(),
        label: yup.string().required(),
        price: yup.string().required(),
    }),
    count: yup.number().required().min(0).integer(),
});

const userCredentialsSchema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
});

const getValidator = (schema) => async (entity) => {
    return schema
        .validate(entity, { abortEarly: false })
        .then(() => [])
        .catch(({ inner }) => inner.map((e) => e.message?.split(' at createError')[0] ?? e))
}

const validateProduct = getValidator(prodcutSchema);
const validateUserCredentials = getValidator(userCredentialsSchema);

const generateSecret = async () => {
    return jose.generateSecret('HS256');

}

const DEFAULT_HEADERS = {};

const RESPONSE_MESSAGES = {
    INVALID_TOKEN: 'Данное действие не доступно текущему пользователю (проверьте токен)',
    USER_NOT_FOUND: 'Пользователь не найден',
    USER_ALREADY_EXISTS: 'Такой пользователь уже существует',
    CART_PRODUCT_NOT_FOUND: 'Продукт не в корзине',
    CART_PRODUCT_ALREADY_EXISTS: 'Продукт уже в корзине',
}

const RESPONSE_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const logBackendError = (e) => {
    if (!APP_CONFIG.LOG_BE_ERRORS) {
        return
    };

    console.groupCollapsed('Ошибка в файле "server.js"');
    console.log(e);
    console.groupEnd();
}

const verifyRequest = async (request, users) => {
    if (!APP_CONFIG.USE_AUTH_CHECK) {
        return;
    }

    try {
        const token = (request.requestHeaders.Authorization || '').split(' ')[1];
        const credentials = await jose.jwtVerify(token, await generateSecret());
        console.log({ credentials })
        const user = users.findBy({ login: credentials.login, password: credentials.password });

        if (!user) {
            return new Response(RESPONSE_CODES.FORBIDDEN, DEFAULT_HEADERS, RESPONSE_MESSAGES.INVALID_TOKEN);
        }
    } catch (e) {
        if (e?.name !== 'JsonWebTokenError') {
            logBackendError(e);
        }

        return new Response(RESPONSE_CODES.FORBIDDEN, DEFAULT_HEADERS, RESPONSE_MESSAGES.INVALID_TOKEN);
    }
}

const getCart = (schema) => {
    return schema.carts.all().models
        .filter(({ attrs: { count } }) => count)
        .map(({ attrs: { productId, ...restGood } }) => ({
        ...restGood,
        id: productId,
    }));
};

createServer({
    models: {
        category: Model,

        good: Model.extend({
            categoryType: belongsTo('category'),
        }),

        cart: Model,

        user: Model,
    },

    factories: {
        good: Factory.extend({
            label: () => faker.commerce.productName(),
            price: () => faker.commerce.price(1, 1000),
            description: () => faker.commerce.productDescription(),
            img: 'https://source.unsplash.com/random',
        }),
    },

    seeds(server) {
        const CATEGORIES = [
            { type: 'house', label: ' Дом, сад, зоотовары' },
            { type: 'children', label: 'Детям и мамам' },
            { type: 'cosmetics', label: 'Косметика, парфюмерия' },
            { type: 'souvenirs', label: 'Сувениры, галантерея' },
            { type: 'books', label: 'Книги' },
            { type: 'products', label: 'Продукты, деликатесы' },
            { type: 'entertainment', label: 'Развлечения, творчество' },
            { type: 'electronics', label: 'Техника, электроника' },
            { type: 'studies', label: 'Канцтовары, учёба' },
            { type: 'sport', label: 'Туризм, отдых, спорт' },
            { type: 'health', label: 'Здоровье, медтехника' },
        ];

        CATEGORIES.forEach((category) => {
            const serverCategory = server.create("category", category);

            server.createList("good", 20, { categoryTypeId: serverCategory.id });
        });

        server.create('user', { login: 'admin', password: 'admin' });
    },


    routes() {
        this.namespace = "api"

        this.get("/categories", (schema, request) => {
            const { ids } = request.queryParams;

            const idsArray = ids?.split(',');

            return schema.categories.where((category) => {
                return idsArray?.includes(category.id) ?? true
            });
        });

        this.get('/popular_categories', (schema) => {
            const categories = schema.categories.all().models;

            return categories.slice(0, 5).map((category) => {
                const items = schema.goods.where({ categoryTypeId: category.id }).models;

                return { category, items };
            });
        });

        this.get("/goods", (schema, request) => {
            const { ids, categoryTypeIds, minPrice, maxPrice, text, limit = 20, offset = 0, sortBy, sortDirection = 'asc' } = request.queryParams;

            const idsArray = ids?.split(',');
            const categoryTypeIdsArray = categoryTypeIds?.split(',');
            const minPriceValue = parseInt(minPrice, 10);
            const maxPriceValue = parseInt(maxPrice, 10);

            const filteredItems = schema.goods.where((good) => {
                const isIdMatch = idsArray?.includes(good.id) ?? true
                const isTypeIdMatch = categoryTypeIdsArray?.includes(good.categoryTypeId) ?? true
                const isMinPriceMatch = Number.isNaN(minPriceValue) ? true : good.price >= minPriceValue;
                const isMaxPriceMatch = Number.isNaN(maxPriceValue) ? true : good.price <= maxPriceValue;
                const isTextMatch = text ? good.label.toLowerCase().includes(text.toLowerCase()) : true;

                return [isIdMatch, isTypeIdMatch, isMinPriceMatch, isMaxPriceMatch, isTextMatch].every(Boolean)
            }).models;

            const sortedItems = sortBy ? orderBy(filteredItems, [sortBy], [sortDirection]) : filteredItems;

            const offsetValue = parseInt(offset, 10);
            const limitValue = parseInt(limit, 10);

            return {
                items: sortedItems.slice(offsetValue, offsetValue + limitValue),
                total: sortedItems.length,
            };
        });

        this.get('/cart', async (schema, request) => {
            const authError = await verifyRequest(request, schema.users);
            if (authError) {
                return authError;
            }

            return getCart(schema)
        });

        this.put('/cart', async (schema, request) => {
            const authError = await verifyRequest(request, schema.users);
            if (authError) {
                return authError;
            }

            try {
                const product = JSON.parse(request.requestBody) ?? {};

                const errors = await validateProduct(product);

                if (errors.length) {
                    return new Response(RESPONSE_CODES.BAD_REQUEST, DEFAULT_HEADERS, errors)
                };

                const goodInCart = schema.carts.where({ productId: product.good.id });

                if (!goodInCart || !goodInCart?.models?.length) {
                    const { id, ...productWithoutId } = product;
                    const cartProduct = { ...productWithoutId, productId: product.good.id };
                    schema.carts.create(cartProduct);
                } else {
                    goodInCart.update('count', product.count)
                }

                return getCart(schema)
            } catch (e) {
                logBackendError(e);
                return new Response(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
            }
        }, { timing: APP_CONFIG.DEFAULT_RESPONSE_DELAY });

        this.post('/login', async (schema, request) => {
            const credentials = JSON.parse(request.requestBody) ?? {};
            const errors = await validateUserCredentials(credentials);

            if (errors.length) {
                return new Response(RESPONSE_CODES.BAD_REQUEST, DEFAULT_HEADERS, errors)
            };

            const user = schema.users.findBy(credentials);

            if (!user) {
                return new Response(RESPONSE_CODES.NOT_FOUND, DEFAULT_HEADERS, RESPONSE_MESSAGES.USER_NOT_FOUND);
            }

            const { login, password } = user;

            //   const token = jwt.sign({ login, password }, JWT_SECRET, { expiresIn: APP_CONFIG.TOKEN_TTL });
            console.log({ login, password })
            const token = await new jose.SignJWT({ login, password }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(APP_CONFIG.TOKEN_TTL).sign(await generateSecret());

            return new Response(RESPONSE_CODES.OK, DEFAULT_HEADERS, { login, token });
        });

        this.post('/registration', async (schema, request) => {
            const credentials = JSON.parse(request.requestBody) ?? {};
            const errors = await validateUserCredentials(credentials);

            if (errors.length) {
                return new Response(RESPONSE_CODES.BAD_REQUEST, {}, errors)
            };

            const currentUser = schema.users.where({ login: credentials.login });

            if (currentUser && currentUser.models.length) {
                return new Response(RESPONSE_CODES.NOT_FOUND, DEFAULT_HEADERS, RESPONSE_MESSAGES.USER_ALREADY_EXISTS);
            }

            return schema.users.create(credentials);
        });
    },
})
