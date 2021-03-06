/*
  Синглтон - класс, который имеет один инстанс. Т.е. сколько бы инстансов мы бы не создали через new,
  все они будут иметь один общий this. Соответственно изменения в одном инстансе приведет к изменению сразу во всех.
  Что удобно, например, для нашего Api при работе с токенами. Мы создает в каждом экшен креаторе новый инстанс (new Api())
  и применяя паттерн синглтон мы можем изменить токен лишь в одном инстансе и он изменится сразу для всех
*/
class SingletonExmaple {
  // общий для всех классов инстанс
  static _instance = null;

  token = '';

  constructor(token = '') {
    // при создании инстанса проверяем не был ли он создан ранее
    if (SingletonExmaple._instance) {
      // если был создан ранее - возвоащаем старый
      return SingletonExmaple._instance;
    }

    // есди не был создан ранее, то нас первый и единственный this навешиваем на инстанс, чтобы возвращать его в будущем
    SingletonExmaple._instance = this;

    // далее обычный флоу конструктора, задания нужных полей
    this.token = token;
  }

  logToken() {
    console.log(this.token)
  }
}

const s1 = new SingletonExmaple('abc');
s1.logToken(); // abc
const s2 = new SingletonExmaple('cde'); // значение в конструкторе игнорируется, т.к. у нас уже есть инстанс s1 и вернется он
s2.logToken(); // abc

s2.token = 'rte'; // поменял токен у второго инстанса и он автоматически поменялся у первого

s1.logToken(); // rte
s2.logToken(); // rte
