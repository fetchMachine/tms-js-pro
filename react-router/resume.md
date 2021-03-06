## react-router-dom

### Мотивация
Когда мы пишем SPA мы хотим иметь контроль над урлом, т.е. понимать на какой странице находится юзер и рендерить ему соответствующую страницу, а также перехватывать изменения урлов, чтобы не происходило перезагрузки страницы (т.к. при таковой все наши компонента и их состояния будут уничтожены).

### Основы

0. Установка библиотека ```npm i react-router-dom```

1. Обязательно оборачиваем все наше приложение в роутер
```javascript
// компонент называется BrowserRouter, мы импортируем его и переименовываем для удобства в просто Router
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    rootElement,
);
```

2. Для перехвата перехода по ссылкам используем вместо тега ```<a href="" />``` компонент ```<Link to="" />```
```javascript
import { Link } from 'react-router-dom';

export const Menu = () => {
    return (
        <ul>
            <li><Link to="/login">Страница логина</Link></li>
            <li><Link to="/register">Страница регистрации</Link></li>
            <li><Link to="/main">Главная страница</Link></li>
        </ul
    )
}
```

Сами ссылки бывают двух видов абсолютные и относительные, представим, что мы находимся по урлу ```google.com/login```
```javascript
// абсолютная ссылка, отравит на с google.com/login на google.com/register
<Link to="/register">Страница регистрации</Link>
// относительная ссылка , отравит на с google.com/login на google.com/login/register
<Link to="./register">Страница регистрации</Link>
```

3. Для отображения наших компонентов согласно роутам используем компоненты ```<Switch />``` ```<Route />```
Логика работы Switch следующая
```javascript
import { Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        // В Switch мы прокидываем детей с условным рендером, Switch выводит лишь первого, кого удалось успешно отрендерить
        <Switch>
            // условный рендер возвращает false и Switch идет дальше
            {false && <Component1 / >}
            // условный рендер возвращает компонент и Switch его рендерит
            {true && <Component2 / >}
            // этот и все последубщие компоненты не будут выведены, т.к. уже был отрендерен компонент ```<Component2 / >```
            // а Switch рендерит лишь один компонент, который удалось отрендерить первым
            {true && <Component3 / >}
        </Switch>
    )
}
```

3б. Но т.к. мы говорим про роутинг наш условный рендер будет связан с проверкой того, на какой странице находится пользователь. Для упрощения синтаксиса таких проверок можно и нужно использовать комопнент ```<Route />```
```javascript
import { Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        // В Switch мы прокидываем детей с условным рендером, Switch выводит лишь первого, кого удалось успешно отрендерить
        <Switch>
            // компонент Route является удобным синтаксисом для условного рендера
            // в данном случае он выведет компонент <LoginPage /> если наш роут НАЧИНАЕТСЯ с /login
            // т.е. выведедет LoginPage для урлов вида /login /login/user loging/2/someElse и т.д.
            <Route path="/login">
                <LoginPage />
            </Route>

            // мы можем прокидывать пропс exact чтобы проверить роут на ТОЧНОЕ СОВПАДНИЕ
            // т.е. выведет RegisterPage для урла вида /register и только для него
            <Route path="/register" exact>
                <RegisterPage />
            </Route>

            // можем также вставлять компоненты без условного рендера, например, тут мы вставили такой в самый конец
            // т.е. если ни один из роутов выше про подойте, мы вывдоим страницу <NotFoundPage />
            <NotFoundPage />
        </Switch>
    )
}
```

3в. Реалзиация пункта 3б в новой версии (шестой) react-router-dom (используется Routes вместо Switch и пропс element)
```javascript
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
     <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<NotFoundPage />} />
    </Routes>
    )
}
```

### Динамичные роуты
Часто стоит задача создавать динамичные роуты, т.е. роуты у которых часть пути может изменяться, например роут вида ```users/456``` который должен отобразить страницу пользователя с id 456. Для использования динамичных роутов нужно сделать 2 вещи: 1) размапить корректно компонент согласно роуту (п.3 из основ) 2) получить этот динамичный id внутри компонента который хотим отобразить. Ниже пример со страницей пользователя

```javascript
<Switch>
    // для динамичного роута обязателен синатксис двоеточия, после которого мы задаем произвольное имя переменной
    // т.е. у нас будет страница юзера по id, то и переменную мы назвали id
    <Route path="/users/:id">
        <UserPage />
    </Route>
</Switch>
```

```javascript
import { withRouter } from 'react-router-dom';

создаем компоненту базу, которую ниже обернем в HOC withRouter
class UserPageBase extends React.Component {
    componentDidMount() {
        // благодаря тому, что мы обернули наш компонент в HOC withRouter у нас появился пропс history
        // в котором мы и сможем найти id из урла
        const { history } = this.props;

        // все переменные из урла будут лежать в объекте history.math.params
        // наша переменная называется id, потому что мы так ее задали выше при мапинге роута <Route path="/users/:id">
        const { id } = history.math.params;

        // теперь мы можем сделать всю необходимую логику, например, пойти на бэк и запросить данные пользователя по id
        getUserData(id)

        /*
            Сделайте console.log(this.props), чтобы посмотреть что еще дает нам HOC withRouter
            Из интересного:
                this.props.location.match.params - тут можно посмотреть все квери параметры текущего урла
                this.props.history.go - функция перехода по истории роутов вперед (аналог браузерной кнопки вперед)
                this.props.history.goBack - функция перехода по истории роутов назад (аналог браузерной кнопки назад)
                this.props.history.push('/login') - можем директивно перейти на нужный роут, используется, если нет возможности воспользоваться компонентом <Link to="/login" />
        */
    }

    render() { ... }
}

// оборачиваем наш компонент в HOC withRouter
export UserPage = withRouter(UserPageBase);
```


### Redirect
Для того чтобы перенаправлять пользователя с одного урла на другой используется компонент ```<Redirect />```. Типичный пример для логина
```javascript
class App extends React.Component {
    state = { isUserAthorized: false };

   render() {
        return (
            <Switch>
                <Route path="/login">
                    // если юзер уже авторизован, то перенаправляем его на нашу секретную страницу
                    {this.state.isUserAthorized ? <Redirect to="/secret"> : <LoginPage />}
                </Route>

                 // если юзер авторизован, то показываем ему нашу секретную страницу
                 // иначе перенаправляем на страницу логина
                <Route path="/secret">
                    {this.state.isUserAthorized ? <SecretPage /> : <Redirect to="/login">}
                </Route>
            </Switch>
    )
   }
}
```
