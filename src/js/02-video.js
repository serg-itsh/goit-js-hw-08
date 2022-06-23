// 1 імпорт пакета відео
import Player from '@vimeo/player';
// 2 імпорт пакета затримки
import throttle from 'lodash.throttle';
// 3 ініціалізація плеєра
// 4 запсуємо в змінну iframe звернення до плеєра
const iframe = document.querySelector('iframe');
// 5 створює новий клас в змінну player
const player = new Player(iframe);
// 6 добавляє слухача за допомогою зворотнього виклику, та вішаємо затримку часу
// player.on(
//   'timeupdate',
//   throttle(function (data) {
//     console.dir(data.seconds);
//   }, 1000)
// );
//
const currentTime = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
  //   {
  //     seconds: 3.034;
  //   }
};
player.on('timeupdate', throttle(currentTime, 1000));
const localStorageTime = localStorage.getItem('videoplayer-current-time');
console.log(localStorageTime);
if (localStorageTime) {
  player.setCurrentTime(localStorageTime);
}
// 3 ///
// 8 встановити поточний час
// player.setCurrentTime(localStorageTime)
// player.setCurrentTime(localStorageTime).then(function (seconds) {
//   // const localStorageTime = localStorage.getItem('videoplayer-current-time');
// //   return localStorageTime === null
// //     ? localStorage.setItem('videoplayer-current-time', data.seconds)
// //     : (localStorageTime = localStorage.getItem('videoplayer-current-time'));
//   // сукунди фактичний час
//   // seconds = the actual time that the player seeked to
// });
//   .catch(function (error) {
//     switch (error.name) {
//       case 'RangeError':
//         console.error('Get state error: ', error.message);
//         // час був більший або менший
//         // the time was less than 0 or greater than the video’s duration
//         break;

//       default:
//         //             save,
//         //   l         oad,
//         // інша помилка
//         // some other error occurred
//         break;
//     }
//   });
