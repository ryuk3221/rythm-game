import './style.css';
import StartScreen from './screens/StartScreen';
import MapsScreen from './screens/MapsScreen';
import GameScreen from './screens/GameScreen';
import { maps } from './maps-list';
import { DEFAULT_MUSIC_VOLUME } from './constants';


//главный html элемент в котором происходит вся динамика
const gameWrapper = document.querySelector('.wrapper');

//текущая музыка
let currentMusic = null;
//индекс текущей карты
let currentMapIndex = null;

//звук клика в меню
const clickSound = new Audio('./sounds/click.mp3');
clickSound.volume = 0.2;

//создаю экземпляр
const startScreen = new StartScreen(gameWrapper);

//создаю экземпляр компонента "список карт"
const mapsScreen = new MapsScreen(gameWrapper, maps);
//
const gameScreen = new GameScreen(gameWrapper);



//инициализирую события
window.addEventListener('click', event => {
  //если кликнули на "играть", рендерю компонент со списком карт
  if (event.target.closest('#play-btn')) {
    clickSound.play();
    mapsScreen.render();

    if (!currentMapIndex) {
      mapsScreen.selectMap(0);

      if (currentMusic) {
        currentMusic.songObj.pause();
      }
      //включаю музыку первой карты так как по дефолту она активная
      currentMusic = {
        songName: maps[0].title,
        songObj: new Audio(maps[0].musicPath)
      };

      currentMusic.songObj.volume = DEFAULT_MUSIC_VOLUME;
      currentMusic.songObj.currentTime = maps[0].previewTiming;
      currentMusic.songObj.play();
    }
  }

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
    gameScreen.render();
    gameScreen.startGame();

    currentMusic.songObj.pause();

    //инициализирую событие для паузы
    window.addEventListener('keydown', gameScreen.showPausePopup);
  }

  //кликнули на карту
  if (event.target.closest('.maps-list__item')) {
    clickSound.play();
    currentMapIndex = Number(event.target.closest('.maps-list__item').dataset.index);

    //меняю заднйи фон под выбранную карту
    mapsScreen.selectMap(currentMapIndex);
    console.log(mapsScreen.currentMapIndex);

    //передаю текущую карту в обьект игрового экрана
    gameScreen.setCurrentMap(maps[currentMapIndex]);

    if (currentMusic.songName !== maps[currentMapIndex].title) {
      currentMusic.songObj.pause();

      currentMusic = {
        songName: maps[currentMapIndex].title,
        songObj: new Audio(maps[currentMapIndex].musicPath)
      };

      currentMusic.songObj.currentTime = maps[currentMapIndex].previewTiming;
      currentMusic.songObj.volume = DEFAULT_MUSIC_VOLUME;
      currentMusic.songObj.play();
    }
  }

  if (event.target.closest('.start-popup__btn')) {
    startScreen.render();
    //включаю музыку стартового экрана
    currentMusic = {
      songName: 'menu-music',
      songObj: new Audio('./sounds/menu-music.mp3')
    };

    currentMusic.songObj.volume = DEFAULT_MUSIC_VOLUME;
    currentMusic.songObj.currentTime = 29.230;
    currentMusic.songObj.play();

    currentMusic.songObj.addEventListener('loadedmetadata', () => {
      startScreen.updateMusicProgressBar(currentMusic.songObj);
    });

    startScreen.showMusicName(currentMusic);
  }
});