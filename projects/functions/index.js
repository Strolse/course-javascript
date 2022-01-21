/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
function returnFirstArgument(value) {
  const result = value;
  return result;
}
returnFirstArgument(15);

/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6

 2.2 *: Значение по умолчанию для второго аргумента должно быть равно 100

 Пример:
   sumWithDefaults(10) вернет 110
 */
function sumWithDefaults(a, ...b) {
  let result;
  if ([...b].length > 0) {
    result = a + b[0];
  } else {
    result = a + 100;
  }

  return result;
}

const a = sumWithDefaults(5, 10);
console.log(a);

const b = sumWithDefaults(5);
console.log(b);

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */
function returnFnResult(fn) {
  const result = fn();
  return result;
}

returnFnResult(function () {
  const value = 'hi';
  return value;
});

/*
 Задание 4:

 Функция должна принимать число (если ничего не передано, то воспринимать как 0) и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter();
   console.log(f()); // выведет 1
   console.log(f()); // выведет 2
   
   f = returnCounter(10);
   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */
function returnCounter(number) {
  return function () {
    if (number === undefined) {
      number = 0;
      return ++number;
    } else {
      return ++number;
    }
  };
}

const f = returnCounter(10);

console.log(f());

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */
function returnArgumentsArray(...argumentsArray) {
  const result = [...argumentsArray];

  return result;
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */
function bindFunction(fn, ...args) {
  const result = function () {
    return fn(...args);
  };
  return result;
}

const newSum = bindFunction(
  function (...a) {
    return [...a].reduce(function (a, b) {
      return a + b;
    });
  },
  2,
  3
);

console.log(newSum());

export {
  returnFirstArgument,
  sumWithDefaults,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
  bindFunction,
};
