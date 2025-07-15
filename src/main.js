import './style.css';
import StartScreen from './screens/StartScreen';
import MapsScreen from './screens/MapsScreen';
import GameScreen from './screens/GameScreen';
import { maps } from './maps-list';
import { DEFAULT_MUSIC_VOLUME } from './constants';
import FirstScreen from './screens/FirstScreen';


//--------------ЗАПУСКАЮ ПРИЛОЖЕНИЕ С ОТОБРАЖЕНИЯ ПРИВЕТСТВУЮЩЕГО "ЭКРАНА"
FirstScreen.render();

//главный html элемент в котором происходит вся динамика
const gameWrapper = document.querySelector('.wrapper');


//создаю экземпляр
// const startScreen = new StartScreen(gameWrapper);

//создаю экземпляр компонента "список карт"
const mapsScreen = new MapsScreen(gameWrapper, maps);
//
const gameScreen = new GameScreen(gameWrapper);



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