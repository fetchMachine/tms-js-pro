### Примитивы
```typescript
let n: number = 5;
let s: string = '5';

// Т.к. TS умеет выводить типы самостоятельно, а константа не может изменится, то типизировать константы примитивы смыслы нет
const nn = 5
```

### Два эквивалентных способа типизировать массив
```typescript
const arr1: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3];

const arr: (number | string)[] = [1, 2, 3, '4', '5', 6];
```

### Readonly массив
```typescript
// readonly массив - это массив определенной длинны, каждый элемент которого имеет свой отдельный тип
const arr1: [number, string, boolean] = [1, '2', false]
const arr2: [number, number, number, number] = [1, 2, 3, 4]
```

### Два способа типизировать объект
```typescript
interface User1 {
    id: number;
    name: string;
}

type User2 = {
    id: number;
    name: string;
}
```

### Unions and Intersection
```typescript
// Union. Тип ID может быть ИЛИ число ИЛИ строка
type ID = number | string;
// Intersection. тип User это И объект с полем id И объект с полем age. Т.е. в результате это объект с двумя полями - id и age.
type User = { id: number } & { age: number };
```

### Наследование
```typescript
// Интерфейсы можно наследовать
interface User1 {
    id: number;
    name: string;
}

interface SuperUser1 extends User {
    secretPassword: string;
}

// для реализации наследования типов используется Intersection
type User2 = {
    id: number;
    name: string;
}

type SuperUser2 = User1 & {
    secretPassword: string;
}

const superUser1: SuperUser1 = { id: 1, name: 'Oleg', secretPassword: '123' };
const superUser2: SuperUser2 = { id: 1, name: 'Oleg', secretPassword: '123' };
```

### Типы для функций
TS всегда пытается выводить типы самостоятельно, но лучше явно указывать тип возвращаемого значения, т.к. это убережет нас от ошибок, когда мы написали неверны код, который возвращает не то что мы планировали.
```typescript
// принимает a: number, b: number и возвращает number
const sum = (a: number, b: number): number => a + b;
```

### Опциональный свойства / аргументы
```typescript
interface User1 {
    id: number;
    name?: string; // name опционален, т.е. можем создать объект не указывая name
}

// b - опционален, т.е. его можно не передавать
const sum = (a: number, b?: number): number => a + b;

// задали дефеолтное значение для b, TS автоматически помечает аргументы с дефолтным значением как опциональные, а также сам выводит тип number исходя из дефолтного значения (typeof 0 === 'number')
const sum = (a: number, b = 0): number => a + b;
```

### Собственные типы
```typescript
// создали тип User2 и можем применять его для типизации
type User = {
    id: number;
    name: string;
}

const user: User = { id: 2, name: 'Oleg' };

const ID = number;

const id: ID = 2;
```

### Тайп Гварды
```typescript
const formatToUpperCase = (a: number | string) => {
    a.toUpperCase(); // ошибка т.к. a может быть числом у которого нет метода toUpperCase

    if (typeof a === 'string') {
        a.toUpperCase(); // когда помещаем код под if где делаем проверку на тип срабатывает Тайп Гвард, т.е. TS понимает, что тут из двух типов (number | string) остался только один - string
        return // если мы доавим return, то TS поймет, что в случае если typeof a === 'string', то код ниже исполнятся не будет, а значит a ниже будет типа number
    }

    a.toString().toUpperCase(); // т.к. в случае если a строка мы сделали return из функции и сюда не дошли, TS корректно понимает что у нас тут тип number
}
```

### Прочие типы
- any - любой тип, т.е. по факту отсутствие типа. При применении теряется вся суть TS, т.к. мы просто теряем типизацию. Лучше не использовать.
- unknown - неизвестный тип, похож на any, т.к. под неизвестным типом подразумевается любой. НО попытка использовать unknown приведет к ошибкам, т.к. перед использованием надо будет делать явные проверки через typeof, соответственно это безопасная замена any, используем вместо any.
```typescript
const f = (a: any, b: unknown) => {
    a.toUpperCase(); // все ок, т.к. a - any
    b.toUpperCase(); // ошибка

    if (typeof b === 'string') {
        b.toUpperCase(); // ок
    }
}
```
- void - тип возвращаемого значения функции, которая ничего не возвращает или возвращает undefined
```typescript
const log = (a: unknown): void => {
    console.log(a);
}
```
- never - то что никогда не произойдет. Например, функция возвращает never, если падает с ошибкой, т.е. по факту ничего не возвращает, т.к. код до return просто не доходит
```typescript
const f = (): never => {
    throw new Error('some error');
    return 2;
}
```

### Enum - похожи на объекты и используются, когда надо объединить в единую сущность несколько констант
```typescript
enum TASK_STATUSES {
    TODO = 'todo',
    DONE = 'done',
    IN_PROCESS = 'in_process',
}
```

### Приведение типов
```typescript
// Мы можем привести один тип к другому, пользоваться с осторожность и когда явно знаем зачем это делать.
const f = (n: number) => {}
let n: string | number = 2;

f(n) // ошибка, т.к. f ожидаем number, а получает string | number
f(n as number) // ок, т.к. мы тип string | number привели к просто number

const f2 = (b: boolean) => {}
f2(n as boolean) // ошибка, т.к. мы не можем на уровне типов привести string | number к boolean. Т.е. as может приводить к одному типу из возможных, а не вообще к любому
```

### Дженерики - служат для отображения взаимосвязи 2+ типов
```typescript
// наиболее частый кейс, показываем взаимосвязь входящих параметров функции и возвращаемого результата
const toArray = <T>(value: T): T[] = > [value];

// res1 будет иметь тип number[], т.к. в качестве параметров передали number
const res1 = toArray(2);
// res2 будет иметь тип string[]
const res2 = toArray('a');

// Можем явно указать тип дженерика. Тут получим ошибку, т.к. мы явно указали, что хотим работать со строкой, а в качестве параметров передали number;
const res3 = toArray<string>(2);

// дженерики могут использованы с любым типом, например, с интерфейсами. Показываем взаимосвязь двух полей объекта.
interface State<T> {
    items: T[];
    selectedItem: T;
}
```

### Встроенные Дженерики
```typescript
interface Props {
    label: string;
    todos: { id: number; label: string }[]
}

interface State {
    isModalVisible: boolean;
}

// типизируем функциональный React компонент
const Component: React.FC<Props> = () => {}

// типизируем классовый React компонент c пропсами и стейтом
class Component extends React.Component<Props, State> {}

// типизируем классовый React компонент стейтом и без пропсов
class Component extends React.Component<{}, State> {}

// типизируем html евенты. Можно смотреть требуемые типы через подсказки IDE при наведении на атрибуты html тега (onChange / onClick / onSubmit и тд)
const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {}

const onBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {}
```


### Обшая информация
- TS всегда пытается выводить типы и если не может этого сделать, то выводит тип any. Это можно настроить в tsconfig.json опцией noImplicitAny (будет возникать ошибка TS в случае невозможности выведения типа). Без этой опции всегда проверяйте в IDE что вам возвращает функция, т.к. есть вероятность, что возвращается any и теряется вообще вся типизация, вы пишете ошибочный код, но TS вам это никак не подсвечивает из-за этих any.
- TS сверяет типы не по названию, а по содержанию
```typescript
interface Car1 {
    id: number;
    name: string;
}

interface Car2 {
    id: number;
    name: string;
    maxSpeed: number;
    year: number;
}

interface User {
    id: number;
    name: string;
    age: number;
}

const car1: Car1 = { id: 1, name: 'bmw' }
const car2: Car1 = { id: 2, name: 'volvo', maxSpeed: 0.4, year: 2001 }
const user: User = { id: 5, name: 'Boris', age: 16 }

const processCar = (car: Car1) => {}

processCar(car1) // ок, функция f ожидает интерфейс Car1, а car1 имеет как раз его
processCar(car2) // ок, функция f ожидает интерфейс Car1, car2 имеет интерфейс Car2, НО сверка идет по значениям. Т.е. сверяется не названия интерфейсов  'Car1' !== 'Car2', а названия и типы полей. Car1 - имеет поля id: number и name: string и такие же поля есть у Car2, поэтому все ок.
processCar(user)  // тут тоже ок, т.к. User, как и Car1 имеет поля id: number и name: string
```
