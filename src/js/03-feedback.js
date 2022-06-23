// 1 імпорт пакета затримки
import throttle from 'lodash.throttle';
// 2 запсуємо в змінну  звернення до форми
const inputForm = document.querySelector('.feedback-form');

// // звертаємося до імпута пошти
// const outputEmail = document.querySelector('.email');
// console.log(outputEmail);
// // звертаємося до інпута повідомлення
// const outputMessage = document.querySelector('.message');
// console.log(outputMessage);
// робимо змінну
const LOCALSTORAGE_KEY = 'feedback-form-state';
// 3 вішаємо слухача на кнопку
inputForm.addEventListener('submit', event => {
  // 4 відміна перезагрузки
  event.preventDefault();
  // 6 збираємо всі значення, FormData це не об*єкт а ітеруюча сущність.  в прототипі є forEach
  const formData = new FormData(inputForm);
  // 7 робимо перебор, виводимо в консоль
  formData.forEach((value, name) => console.log(value, name));
});

// 8 вішаємо на форму другого слухача, у селекторів подія change
inputForm.addEventListener('change', evt => {
  // 30 рефакторинг коду, перевіряємо чи є щось в сховищі ініціалізуємо об*єкт через let
  let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
  //  31.1 робимо перевiрку на наявність
  persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
  // 11 якщо такого [динамічне невідоме], імені немає,     то воно запишеться
  persistedFilters[evt.target.name] = evt.target.value;
  // 9 записуємо в сховище значення    об*єкt в рядок
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedFilters));
});

// 13 ініціалізуємо форм
function initForm() {
  // let saveFilters = localStorage.getItem(JSON.parse(selectedFilters));
  // console.log(saveFilters);
  // 14 викликаємо дані зі сховища
  let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
  // 15 робимо перевірку на наявність, чи не null
  if (persistedFilters) {
    // 16 розпарсюємо об*єкт
    persistedFilters = JSON.parse(persistedFilters);
    // 23 дістаємо кллючі та значення і робимо деструкtоризацію
    Object.entries(persistedFilters).forEach(([name, value]) => {
      console.log(name, value);
      // 25 звертфємось до імені і присвоюємо значення
      inputForm.elements[name].value = value;
    });
  }
}
initForm();

// 27 слухач на кнопку submit
inputForm.addEventListener(
  'submit',
  throttle(event => {
    // 4 відміна перезагрузки
    event.preventDefault();
    // 29 із локального сховища видаляємо дані
    localStorage.removeItem(LOCALSTORAGE_KEY);
    // 28 очищуємо фільтр кнопкою submit
    inputForm.reset();
  }, 500)
);

// codepen
function updateOutput() {
  outputEmail.textContent = localStorage.getItem(LOCALSTORAGE_KEY) || '';
  outputMessage.textContent = localStorage.getItem(LOCALSTORAGE_KEY) || '';
}
