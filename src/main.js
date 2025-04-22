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
//звук клика в меню
const clickSound = new Audio('./sounds/click.mp3');
clickSound.volume = 0.7;

//создаю экземпляр, и сразу рендерю стартовый экран
const startScreen = new StartScreen(gameWrapper);
//включаю музыку стартового экрана
currentMusic = {
  songName: 'menu-music',
  songObj: new Audio('./sounds/menu-music.mp3')
}

currentMusic.songObj.volume = DEFAULT_MUSIC_VOLUME;
currentMusic.songObj.currentTime = 29.230;
currentMusic.songObj.play();


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
    //включаю музыку первой карты так как по дефолту она активная
    currentMusic.songObj.pause();
    currentMusic = {
      songName: maps[0].title,
      songObj: new Audio(maps[0].musicPath)
    };
    
    currentMusic.songObj.volume = DEFAULT_MUSIC_VOLUME;
    currentMusic.songObj.currentTime = maps[0].previewTiming;
    currentMusic.songObj.play();
  }

  //кликнули на "назад"
  if (event.target.closest('.maps-frame__back-btn')) {
    //рендерю снова стартовый экран
    startScreen.render();
    clickSound.play();
  }

  //кликнули начать играть
  if (event.target.closest('.maps-frame__btn')) {
    clickSound.play();
    gameScreen.render();
    gameScreen.startGame();
  }

  //кликнули на карту
  if (event.target.closest('.maps-list__item')) {
    clickSound.play();
    const selectedMapIndex = Number(event.target.closest('.maps-list__item').dataset.index);

    //меняю заднйи фон под выбранную карту
    mapsScreen.selectMap(selectedMapIndex);
    console.log(mapsScreen.currentMapIndex);

    //передаю текущую карту в обьект игрового экрана
    gameScreen.setCurrentMap(maps[selectedMapIndex]);

    if (currentMusic.songName !== maps[selectedMapIndex].title) {
      currentMusic.songObj.pause();

      currentMusic = {
        songName: maps[selectedMapIndex].title,
        songObj: new Audio(maps[selectedMapIndex].musicPath)
      };

      currentMusic.songObj.currentTime = maps[selectedMapIndex].previewTiming;
      currentMusic.songObj.volume = DEFAULT_MUSIC_VOLUME;
      currentMusic.songObj.play();
    }
  }

});