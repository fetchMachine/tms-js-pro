### Важно
- Таски лучше делать в порядке перечисления в таблице
- Примеры кода схематичны и пытаются выразить лишь основную суть задачи, **код писался без автокомлита и возможны потери скобок!**
- В каждой задаче подразумевается css стилизация

| Задача  | Суть  | Пример код |
|------------- |---------------| -------------|
| Делаем базу коммон компонентов      | компоненты "обертки" над html компонентами - принимают и пробрасывают дальше пропсы value / onChange + добавялет стили от себя. Примеры коммоне компонентов - input / DateInput / Checkbox / Button и проч | ```const Input = ({ value, onChange }) => <input value={value} onChange={onChange} className={css.input} />``` |
| Делаем компонент хедер     | Компонент с логотипом и меню-заглушкой (текст "Menu" - по клику пока только alert('Меню')        |```const Header = () => <header className={css.header}><img /><div className={css.menu} onClick={() => alert('Меню')}>menu</div></header>```|
| Делаем компонент Dashboard | компонент в котором вызывается Header,    есть массив статусов [done, inProgress, и тд] и этот массив мапится в обычные дивы     | ```const Dashboard = () => <div><Header>{STATUSES.map((status) => <div>{status}</div>)}</div>``` |
|Добавляем простую карточку| Компонент с пропсома title и items (которые просто мапятся в ul)  + стили |```const Card = ({ title, items }) => <div><h2>{title}</h2><ul>{items.map}</ul</div>```|
|Добляем карточку в Dashboard| Вместо уже существующего мапинга STATUSES в div далем мапинг STATUSES в Card. Заводим в Dashboard state минимум с 3 тасками (по одной каждого вида), фильтруем и прокидываем таски стейта в каждую из карточке | ```{STATUSES.map((status) => <Card title={status} items={this.state.tasks.filter((task) => task.satatus === status)} />)}``` |
|Пишем простую модалку без порталов|Компонент который принимает children / isVisible / onClose + накидывает стили с position: absolute|```const Modal = ({ isVisisble, onClose, children }) => isVisisble && <div><button onClick={onClose} />{children}</div>``` |
|Применяем модалку к меню хедера|заводим в хедере стейт isMenuOpen и хендлер и прокидываем все это в модалку вместе с пунктами меню|```<Modal isVisible={this.state.isMenuOpen} onClose={() => this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }))}><ul><li>Пункт 1</li></ul></Modal>```

### Пример структуры
```
src
|   index.js
└───components
│   │   App.js
│   │   index.js
|   |
│   └───Header
│   |   │   Header.js
│   |   │   styles.css
│   |   │   index.js
|   |
│   └───common
|       | index.js
|       |
|       └───Input
|           |   Input.js
|           |   styles.css
|           |   index.js
```
