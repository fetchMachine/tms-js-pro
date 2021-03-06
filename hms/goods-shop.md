# GoodsShop
1. Создать в отдельном репозитории проект с помощью creatre-react-app --template typescript (если не уверены в своих силах, можно делать на js)
2. Создать компонент Menu используя antd, который принимает в пропсах пункты меню (создать список самому согласно структуре categories) и мапит его в список ссылок
    - Пример пункта меню ```<li><a href="#">{title}</a></li>```
    - Структура пунктов меню ```const categories = [{ id: 1, type: 'house', label: 'Дом' }]; ```
3. Создать компонент Card с помощью antd (можно сначала попробовать сделать обычном html и потом переделать на antd), который принимает в пропсы товар ```const good = { id: 1, category_type: 'house', label: 'Коврик', price: 99, img: 'https://source.unsplash.com/random'  }```. Все карточки должны быть одинакового размера, независимо от размеров картинки.
4. Создать компонент категории товаров <GoodCategory /> (Название категории + карточки с товарами), который принимает в пропсах одну категории товаров. Название категории выводим в шапку, товары мапим в карточку из п.2
    - Структура категорий товаров ```const goodCategory = { category:{ id: 1, type: 'house', label: 'Дом' }, items: [{ id: 1, category_type: 'house', label: 'Коврик', price: 99, img: 'https://source.unsplash.com/random'  }]  }; ```
5. Создать компонент <Footer /> с произвольным текстом внутри (Footer)
6. Создать компонент <MainPage />, который выводит все наши выше созданные компоненты (меню / категории товаров / футер) и прокидывает необходимые им пропсы
    - Прокидывает пункты меню в <Menu />
    - Мапит популярные категории (создать самому согласно структуре popularCategories), прокидывая каждую категорию в <GoodCategory /> `const popularCategories = [{ category:{ id: 1, type: 'house', label: 'Дом' }, items: [{ id: 1, category_type: 'house', label: 'Коврик', price: 99, img: 'https://source.unsplash.com/random'  }]  }]; `
    - Для создания структуры разметки использовать компоненты Row и Col из antd (можно сначала написать на обычных дивах и потом перевести на antd)
7. Подключить роутинг (выводит единственный компонент <MainPage /> для любого роута)
    - Установить react-router-dom
    - Обернуть все приложение Router (см п.1 резюме react-router)
    - Добавить один единственный роут на нашу страницу <MainPage /> для любого урла ```path="/"``` (см п.3в резюме react-router)
    - Заменить тег <a> на компонент <Link /> в нашем <Menu /> (см п.2 резюме react-router)
8. Подключить redux и перенести в его initialState popularCategories и categories из <MainPage />
    - [базовый пример](https://codesandbox.io/s/xenodochial-mendel-iwhpb)
    - Установить библиотеки redux и react-redux
    - создать редюсер возвращающий initialState ```const initialState = { popularCategories, categories }``` (см src/store/reducer примера)
    - создать стору (createStore) используя редюсер и обернуть все приложение в провайдер используя наш стору ```<Provider store={store}><App /></Provider> ``` (см src/index примера)
    - Написать селекторы для получения popularCategories и categories соответвующих данных из сторы (см src/store/selectors примера)
    - Изменить компонент <Menu />, теперь он должен получать пункты меню не из пропсов, а из редакса используя хук useSelector и написанный нами селектор (см src/App примера)
    - Изменить компонент <MainPage />, теперь он должен получать popularCategories, из редакса используя хук useSelector и написанный нами селектор (см src/App примера)

 # Next
1. Создать компонент CategoryPage, который будет выводить информацию по отдельно взятой категории (переиспользуем уже существующий компонент категории, который у нас на главной странице). Нужную категорию он должен из урла с помощью хука ```useParams```. Если нужная категория не найдена в массиве категорий (ищем по типу в массиве categories: categories.find(el => el.type === ИСКАМАЯ_КАТЕГОРИЯ) - выводим сообщение "Категория не найдена, вернуться назад".
2. Слово назад должно быть ссылкой, которая перемещает пользователя назад по истории (получаем историю из хука useHistory и вызываем у нее метод goBack). ```const history = useHistory(); history.goBack();```
3. Добавить в наши роуты динамический роут для  CategoryPage ```<Route path="/:type" element={CategoryPage} />```
4. Создать компонент ProductPage, который выводит картинку / цена / название / описание (добавить поле description в наши константы продукта) продукта. Если не смогли найти продукт - показываем сообщение "Продукт не найден, вернуться назад".  Слово назад должно быть ссылкой, которая перемещает пользователя назад по истории.
5. Добавить в наши роуты динамический роут для  ProductPage ```<Route path="/:type/:id element={ProductPage} />```. Поместить этот роут на строчку выше роута для CategoryPage.
6. Изменить ссылке в нашем пеню, теперь они должны вести на страницу категории ```<Link to={`/${type}`}> ```
7. Карточки с продуктом должны быть ссылками и при клике должны вести на страницу продукта ```<Link to={`/${type}/${product.id}`}> ```

## Интеграция с бекендом
0. установить miragejs / faker / yup, скорпировать файл [server.js](https://github.com/fetchMachine/tms-js-pro/blob/main/hms/misc/server_shop.js) с моками бека  себе в проект и импортировать в src/index
1. Создать класс, ответственный за коммуникацию с бекендом в src/api/Api. Класс должен содержать методы получения данных для каждого ендпоинта (делать fetch запрос, проверять на ok, делать, вызывать .json() и при необходимости трансформировать данные из структуры что отдал бекенд в удобную для вас структуру). Также тут создаем все интерфейсы и наши методы должны возвращать не any, а типизированные объекты
```javascript
interface Good {
    id: string;
    label: string;
    // ...
}
class Api {
    getGoods(): Promise<{ items: Good[]; total: number }> {
        return fetch('/api/goods').then(r => {
            if (r.ok) {
                return r.json()
            }
        });
    }
}
```

2. Создать отдельный слайс в сторе для корзины используя combineReducer.

3. Создать компонент HEADER.  1) Должен отображаться на всех роутах (Footer тоже, если еще не) 2) Должен иметь логотип ссылку на главную страницу "/" 3) Должен иметь инпут, пока без какой-либо логики 4) Должен иметь корзину (кнопку или картинку), которая при наличии товаров в ней должна отобразить бейдж с кол-вом товаров (Используем гет запрос по урлу "api/cart" на маутинге компонента, чтобы получить и положить корзину в стору).

4. Используя redux-thunk связать меню с беком. Удалить существующие моки категория для меню, на маунтинге меню (использовать useEffect) запросить данные с бека (```fetch('/api/categories')```), использовать статусы загрузки, чтобы отображать лоадер на время загрузки / сообщение об ошибке, если запрос провалился.
5. Используя redux-thunk связать с беком популярные категории (на маутинге страницы популярных категорий делать гет запрос по урлу "api/popular_categories")
6. Связать страницу категории, используя redux-thunk, делаем два гет запроса: получаем категорию гет запросом "/api/categories?ids=ID_КАТЕГОРИИ" и товары этой категории гет запросом "/api/goods?categoryTypeIds=ID_КАТЕГОРИИ". Для выполнения двух запросов параллельно в идеале использовать [Promise.all](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
7. Связать страницу продукта, используя redux-thunk и гет запрос "/api/goods?ids=ID_ПРОДУКТА"
8. Удалить все моки из проекта (продукты / категории), теперь у нас все приходит с бека.
9. На странице продукта сделать кнопку добавления / удаления продукта в корзину (используя redux-thunk). Если продукта нет в корзине - добавляем (делаем put запрос по урлу "api/cart", в body передаем весь продукт), если товар уже в корзине - удаляем (делаем delete запрос по урлу "api/cart", в body передаем весь продукт). После добавления / удаления товара должен обновляться счетчик товаров корзины (для этого в случае успешного добавления / удаления снова перепрашиваем корзину). На время запроса к беку кнопку задизейблить

## Misc
```typescript
// пример лоадстатусов
export enum LOAD_STATUSES = {
    UNKNOWN = 'unknown',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error',
}
```

```typescript
// пример useEffect аналога метода componentDidMount
useEffect(() => {
    dispatch(someAction);
}, [])
```
