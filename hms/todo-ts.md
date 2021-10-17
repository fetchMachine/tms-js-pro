### TODO TYPING

- Пишем todo-app на typescript, [описание таски](https://github.com/fetchMachine/tms-js-pro/blob/main/hms/todo.md)
- Кто делал ранее - можно покрыть тестами уже существующий код.
- Пишем не в одном файлу, а разбиваем на компоненты. Миниму должны быть выделены компоненты ```<Input />```, ```<TaskList />```, ```<RadioGroup />```.
- Создаем приложение в отдельном репозитории с помощью CRA ```npx create-react-app todo-app-ts --template typescript``` (CRA проставляет строгие настройки для TS, которые можно изменить только через большие костыли и которые будут запрещать компилировать код, если у вас ошибка типизации (будет подсвечено где именно ошибка и ее можно временно заткнуть с помощью **any**), так что это вариант для уверенных в себе), либо в **codesandbox**.