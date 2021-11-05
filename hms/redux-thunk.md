TODO
- Добавить к текущему тудушнику на редаксе селекторы, константы, action creators
- Получение / добавление / тогла состояния (сделано / не сделано) задачи должно производится через бекенд, результат должен класться в redux. Для этого применить библиотеку redux-thunk.
- Как доп пункт сделать связку с redux через хуки, вместо connect.

Связка с беком:
- Установить библиотеку miragejs `npm i --save-dev miragejs`
- Скопировать файл [server.js](https://github.com/fetchMachine/tms-js-pro/blob/main/hms/misc/server.js) себе в **src** и заимпортировать его в **src/index.ts** `import './server'`
- Для получения списка задач делаем GET запрос по адресу api/todos `fetch('api/todos')`
- Для добавления новой задачи делаем POST запрос по адресу api/todos `fetch('api/todos', { method: 'POST', body: ТЕКС_ЗАДАЧИ })`
- Для тогла статуса делаем PATCH запрос по адресу api/todos/:id, передавая изменённую (переключенный статус) задачу.
```javascript
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const nextTodo = { ...todo, isDone: !todo.isDone }
    fetch(`api/todos/${id}`, { method: 'PATCH', body: JSON.stringify(nextTodo) });
  }
```
- Это моковый сервер, поэтому после перезагрузки страницы состояние скинется к первоначальному - это ок.
- После того как добавили новую задачу / изменили статус старой не забываем перезапрашивать заново список с бека, чтобы обновить его на ui.

Links:
- [Пример с занятия](https://codesandbox.io/s/kind-moon-6hhj6)
