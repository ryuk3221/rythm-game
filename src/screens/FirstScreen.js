import StartScreen from "./StartScreen";
import { DEFAULT_MUSIC_VOLUME } from "../constants";

class FirstScreen {
    static html =
        `
        <div class="start-popup">
            <div class="start-popup__content">
                <div class="start-popup__icon">🎧</div>
                <div class="start-popup__title">Добро пожаловать!</div>
                <div class="start-popup__text">
                Так как это ритм игра, рекомендуется подключить проводные наушники.
                </div>
                <button class="start-popup__btn">Начать!</button>
            </div>
        </div>
    `;

    static render = () => {
        document.querySelector('.wrapper').innerHTML = this.html;
        this.initEvents();

        console.log('Render FirstScreen');
    }

    static initEvents = () => {
        document.querySelector('.start-popup__btn').onclick = () => {
            //по клику рендерю меню
            StartScreen.render();

            //сохраняю текущую музыку
            window.currentSong = {
                songName: 'menu-music',
                songObj: new Audio('./sounds/menu-music.mp3')
            };

            window.currentSong.songObj.volume = DEFAULT_MUSIC_VOLUME;
            window.currentSong.songObj.currentTime = 29.230;
            window.currentSong.songObj.play();

            window.currentSong.songObj.addEventListener('loadedmetadata', () => {
                StartScreen.updateMusicProgressBar(window.currentSong.songObj);
            });
        }
    }
}

export default FirstScreen;