# GoodsShop
1. Создать в отдельном репозитории проект с помощью creatre-react-app --template typescript (если не уверены в своих силах, можно делать на js)
2. Создать компонент Menu используя antd, который принимает в пропсах пункты меню (создать список самому согласно структуре categories) и мапит его в список ссылок
    - Пример пункта меню ```<li><a href="#">{title}</a></li>```
    - Структура пунктов меню ```const categories = [{ id: 1, type: 'house', label: 'Дом' }]; ```
3. Создать компонент Card с помощью antd (можно сначала попробовать сделать обычном html и потом переделать на antd), который принимает в пропсы товар ```const good = { id: 1, category_type: 'house', label: 'Коврик', price: 99, img: 'https://source.unsplash.com/random'  }```. Все карточки должны быть одинакового размера, независимо от размеров картинки.
4. Создать компонент категории товаров <GoodCategory /> (Название категории + карточки с товарами), который принимает в пропсах одну категории товаров. Название категории выводим в шапку, товары мапим в карточку из п.2
    - Структура категорий товаров ```const goodCategory = { category:{ id: 1, type: 'house', label: 'Дом' }, items: [{ id: 1, category_type: 'house', label: 'Коврик', price: 99, img: 'https://source.unsplash.com/random'  }]  }; ```
5. Создать компонент <Footer /> с произвольным текстом внутри
6. Создать компонент <MainPage />, который выводит все наши выше созданные компоненты (меню / категории товаров / футер) и прокидывает необходимые им пропсы
    - Прокидывает пункты меню в <Menu />
    - Мапит популярные категории (создать самому согласно структуре popularCategories), прокидывая каждую категорию в <GoodCategory /> ``const popularCategories = [{ category:{ id: 1, type: 'house', label: 'Дом' }, items: [{ id: 1, category_type: 'house', label: 'Коврик', price: 99, img: 'https://source.unsplash.com/random'  }]  }]; ```
    - Для создания структуры разметки использовать компоненты Row и Col из antd (можно сначала написать на обычных дивах и потом перевести на antd)
7. Подключить роутинг (выводит единственный компонент <MainPage /> для любого роута)
    - Установить react-router-dom
    - Обернуть все приложение Router (см п.1 резюме react-router)
    - Добавить один единственный роут на нашу страницу <MainPage /> для любого урла ```path="/"``` (см п.3в резюме react-router)
    - Заменить тег <a> на компонент <Link /> в нашем <Menu /> (см п.2 резюме react-router)
8. Подключить redux и перенести в его initialState popularCategories и categories из <MainPage />
    - [базовый пример](https://codesandbox.io/s/xenodochial-mendel-iwhpb)
    - устанить библиотеки redux и react-redux
    - создать редюсер возвращающий initialState ```const initialState = { popularCategories, categories }``` (см src/store/reducer примера)
    - создать стору (createStore) используя редюсер и обернуть все приложение в провайдер используя наш стору ```<Provider store={store}><App /></Provider> ``` (см src/index примера)
    - Написать селекторы для получения popularCategories и categories соответвующих данных из сторы (см src/store/selectors примера)
    - Изменить компонент <Menu />, теперь он должен получать пункты меню не из пропсов, а из редакса используя хук useSelector и написанный нами селектор (см src/App примера)
    - Изменить компонент <MainPage />, теперь он должен получать popularCategories, из редакса используя хук useSelector и написанный нами селектор (см src/App примера)
