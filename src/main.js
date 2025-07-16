import './style.css';
import { maps } from './maps-list';
import FirstScreen from './screens/FirstScreen';
import { map7 } from './notes';

let dublikats = [];

// for (let i = 0; i < map7.length; i++) {
//     for (let j = 0; j < map7.length; j++) {
//         if (i !== j) {
//             if (map7[i].delay == map7[j].delay && map7[i].column == map7[j].column) {
//                 dublikats.push(map7[i]);
//             }
//         } 
//     }
// }

console.log(dublikats);


//--------------ЗАПУСКАЮ ПРИЛОЖЕНИЕ С ОТОБРАЖЕНИЯ ПРИВЕТСТВУЮЩЕГО "ЭКРАНА"
FirstScreen.render();



//инициализирую события кликов (здесь обработчики кликов для всего приложения)
window.addEventListener('click', event => {
  //кликнули на "назад"
  if (event.target.closest('.maps-frame__back-btn')) {
    //рендерю снова стартовый экран
    startScreen.render();
    clickSound.play();
    startScreen.showMusicName(currentMusic);

    currentMusic.songObj.addEventListener('timeupdate', () => {
      startScreen.updateMusicProgressBar(currentMusic.songObj);
    });
  }

  //кликнули начать играть
  if (event.target.closest('.maps-frame__btn')) {
    clickSound.play();
    gameScreen.setCurrentMap(maps[currentMapIndex]);
    gameScreen.render();
    gameScreen.newStartGame();

    currentMusic.songObj.pause();


    //инициализирую событие для паузы
    window.addEventListener('keydown', gameScreen.showPausePopup);
  }



  //кликнули на "начать"
  // if (event.target.closest('.start-popup__btn')) {
  // startScreen.render();
  // //включаю музыку стартового экрана
  // currentMusic = {
  //   songName: 'menu-music',
  //   songObj: new Audio('./sounds/menu-music.mp3')
  // };

  // currentMusic.songObj.volume = DEFAULT_MUSIC_VOLUME;
  // currentMusic.songObj.currentTime = 29.230;
  // currentMusic.songObj.play();

  // currentMusic.songObj.addEventListener('loadedmetadata', () => {
  //   startScreen.updateMusicProgressBar(currentMusic.songObj);
  // });

  // startScreen.showMusicName(currentMusic);
  // }

  //обработчики кликов на окне паузы-------------
  //кликнули на кнопку "выйти"
  if (event.target.closest('.btn-exit')) {
    //скрываю окно паузы
    document.querySelector('.pause-popup').classList.remove('pause-popup-active');
    //меняю состояние паузы
    gameScreen.isPaused = false;
    //отменяю анимирование нот
    cancelAnimationFrame(gameScreen.animationId);
    //рендерю экран со списком карт
    mapsScreen.render();

    currentMusic.songObj.currentTime = gameScreen.music.currentTime;
    currentMusic.songObj.play();

    window.removeEventListener('keydown', gameScreen.showPausePopup);
  }

  //обработчик клика на окне фэйла
  //клик на "выйти"
  if (event.target.closest('.fale-popup-exit')) {
    document.querySelector('.fale-popup').classList.remove('fale-popup--show');
    //отменяю анимирование нот
    cancelAnimationFrame(gameScreen.animationId);
    //рендерю экран со списком карт
    mapsScreen.render();
    currentMusic.songObj.currentTime = gameScreen.music.currentTime;
    currentMusic.songObj.play();

    window.removeEventListener('keydown', gameScreen.showPausePopup);
  }

  //клик на "начать заного"
});