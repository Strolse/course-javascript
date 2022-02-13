/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let cookies = cookieParse(cookies);

filterNameInput.addEventListener('input', function () {
  updateFilter(this.value);
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  if (filterNameInput.value) {
    updateFilter(filterNameInput.value);
  } else {
    cookies = cookieParse(cookies);
  }
  addNameInput.value = '';
  addValueInput.value = '';
  addCookieInTable(cookies);
});

function cookieParse(cookies) {
  cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});

  return cookies;
}

function addCookieInTable(obj) {
  listTable.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (const name in obj) {
    const newTr = document.createElement('tr');
    fragment.appendChild(newTr);

    const newThName = document.createElement('th');
    newThName.textContent = name;
    newThName.classList.add('cookieName');
    newTr.appendChild(newThName);

    const newThVal = document.createElement('th');
    newThVal.textContent = obj[name];
    newTr.appendChild(newThVal);

    const newThDelete = document.createElement('th');
    newTr.appendChild(newThDelete);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('remove');
    deleteButton.textContent = 'Удалить';
    newThDelete.appendChild(deleteButton);
  }
  listTable.appendChild(fragment);
}

listTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const cookieRemoved = e.target.closest('tr');
    const name = cookieRemoved.getElementsByClassName('cookieName');
    for (const key in cookies)
      if (key === name[0].textContent) {
        document.cookie = `${key}=${cookies[key]}; max-age=-1`;
      }

    listTable.removeChild(cookieRemoved);
  }
});

function isMatching(cookie, filterValue) {
  return cookie.toUpperCase().includes(filterValue.toUpperCase());
}

function updateFilter(filterValue) {
  listTable.innerHTML = '';
  cookies = cookieParse(cookies);

  for (const cookie in cookies) {
    if (
      filterValue &&
      !isMatching(cookie, filterValue) &&
      !isMatching(cookies[cookie], filterValue)
    ) {
      delete cookies[cookie];
    }
  }
  addCookieInTable(cookies);
}

addCookieInTable(cookies);
