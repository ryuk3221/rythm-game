import { DEFAULT_MUSIC_VOLUME, OFFSET } from "../constants";
import { perfectDifference, normalDifference, badDifference } from "../constants";

class GameScreen {
    static html = `
      <div class="game-frame" style='background-image: linear-gradient(86deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%), url("images/map1.jpg");'>
        <div class="pause-popup">
          <div class="pause-popup__content">
            <button class="pause-popup__btn btn-continue">Продолжить</button>
            <button class="pause-popup__btn btn-retry">Заного</button>
            <button class="pause-popup__btn btn-exit">Выйти</button>
          </div>
        </div>
        <div class="game-container">
          <div class="accuracy">300</div>
          <div class="canvas-wrapper">
            <canvas class="game-canvas" width="480" height="800">

            </canvas>
          </div>
          <div class="buttons">
            <div data-column="1" data-key="KeyS">S</div>
            <div data-column="2" data-key="KeyN">N</div>
            <div data-column="3" data-key="KeyM">M</div>
            <div data-column="4" data-key="KeyJ">J</div>
            <div data-column="5" data-key="KeyK">K</div>
            <div data-column="6" data-key="KeyL">L</div>
          </div>
        </div>
        <div class="game-frame__map-duration">
          <span class="map-progress"></span>
        </div>
        <div class="game-frame__combo">
          <span class="x">х</span>
          <span class="game-frame__combo-number">0</span>
        </div>
        <div class="game-frame__points">
          0
        </div>
        <div class="game-frame__health">
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 36.7C19.8 36.7 19.6 36.6 19.4 36.5C11.4 31.3 5 25.2 5 16.5C5 10.6 9.3 6 14.5 6C17.2 6 19.7 7.2 21 9.2C22.3 7.2 24.8 6 27.5 6C32.7 6 37 10.6 37 16.5C37 25.2 30.6 31.3 22.6 36.5C22.4 36.6 22.2 36.7 22 36.7H20Z" 
                  fill="#ff0000" />
          </svg>
          <div class="healts-wrapper">
            <div class="healts-progress"></div>
          </div>
        </div>
      </div>
    `;

    static pop = new Audio('../../sounds/drum-hitnormal.mp3');
    static comboBreakSound = new Audio('../../sounds/combobreak.mp3');

    static keys = {
        'keyN': false,
        'keyM': false,
        'keyF': false,
        'keyJ': false,
        'keyK': false,
        'keyL': false,
    };

    static currentMapObj = null;
    static isPaused = false;

    static animationId = null;
    static activeNotes = [];
    static timioutIds = [];
    static combo = 0;
    static points = 0;
    static healts = 10;

    static renderWindow = 3000;  // отображаем только ноты, которые появятся в ближайшие 3 секунды
    static appearBeforeHit = 1500; // нота появляется за 1.5 сек до удара
    static noteSpeed = 0.7;
    static hitLine = 760;
    static playedNotes = new Set();


    static render() {
      document.querySelector('.wrapper').innerHTML = this.html;
      this.pop.volume = 0.2;
      this.comboBreakSound.volume = 0.2;

      //----ВЕШАЮ СОБЫТИЯ
      this.initEvents();

      //после рендера разметки, получаю canvas и контекст
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');

      //получаю другие html элементы
      this.accuracyElement = document.querySelector('.accuracy');
      this.comboElement = document.querySelector('.game-frame__combo-number');
      this.healtsElement = document.querySelector('.healts-progress');
      this.controls = document.querySelector('.buttons');
      //обнуляю координаты нот
      this.currentMapObj.notes.forEach(note => { if (note.y) note.y = 0; });

      setTimeout(() => { this.newStartGame() }, 1500);
    }

    static initEvents() {
        //инициализирую обработчик нажатий 
        window.onkeydown = event => {
            if (event.code == 'KeyS' && !this.keys[event.code]) {
                this.controls.querySelector('[data-column="1"]').classList.add('active');
                this.keys[event.code] = true;
                this.pop.currentTime = 0;
                this.pop.play();
                this.checkNoteHit(1);
            }

            if (event.code == 'KeyN' && !this.keys[event.code]) {
                this.controls.querySelector('[data-column="2"]').classList.add('active');
                this.keys[event.code] = true;
                this.pop.currentTime = 0;
                this.pop.play();
                this.checkNoteHit(2);
            }

            if (event.code == 'KeyM' && !this.keys[event.code]) {
                this.controls.querySelector('[data-column="3"]').classList.add('active');
                this.keys[event.code] = true;
                this.pop.currentTime = 0;
                this.pop.play();
                this.checkNoteHit(3);
            }

            if (event.code == 'KeyJ' && !this.keys[event.code]) {
                this.controls.querySelector('[data-column="4"]').classList.add('active');
                this.keys[event.code] = true;
                this.pop.currentTime = 0;
                this.pop.play();
                this.checkNoteHit(4);
            }

            if (event.code == 'KeyK' && !this.keys[event.code]) {
                this.controls.querySelector('[data-column="5"]').classList.add('active');
                this.keys[event.code] = true;
                this.pop.currentTime = 0;
                this.pop.play();
                this.checkNoteHit(5);
            }

            if (event.code == 'KeyL' && !this.keys[event.code]) {
                this.controls.querySelector('[data-column="6"]').classList.add('active');
                this.keys[event.code] = true;
                this.pop.currentTime = 0;
                this.pop.play();
                this.checkNoteHit(6);
            }
        }

        window.onkeyup = event => {
            this.keys[event.code] = false;

            if (this.controls.querySelector(`[data-key="${event.code}"]`)) {
                this.controls.querySelector(`[data-key="${event.code}"]`).classList.remove('active');
            }
        }

        //обработчик нажатия на паузу клавишей
        window.addEventListener('keydown', event => this.showPausePopup(event));
    }

    static setCurrentMap(mapObj) {
      this.currentMapObj = mapObj;
      this.music = new Audio(this.currentMapObj.musicPath);
      this.music.volume = 0.1;
    }

    //--------новый метод
    static newStartGame = () => {
      this.music.currentTime = 0;
      this.music.volume = DEFAULT_MUSIC_VOLUME;
      this.music.play();
      this.startTime = performance.now();

      //планирую появление нот в ближайшие 3 сек
      this.scheduleNotesWindow();
      requestAnimationFrame(this.renderLoop);
    }


  static scheduleNotesWindow = () => {
    const now = performance.now();
    const currentTime = now - this.startTime;

    this.currentMapObj.notes.forEach(note => {
      //тайминг появления ноты
      const appearTime = note.delay - this.appearBeforeHit;
      const timeUntilAppear = appearTime - currentTime;

      if (timeUntilAppear >= 0 && timeUntilAppear <= this.renderWindow) {
        if (!this.playedNotes.has(note.id)) {
          setTimeout(() => {
            this.activeNotes.push(note);
            this.playedNotes.add(note.id);
          }, timeUntilAppear);

          // // 👉 Планируем воспроизведение щелчка
          // const timeUntilHit = note.delay - this.currentTime;
          // setTimeout(() => {
          //   this.pop.currentTime = 0;
          //   this.pop.play();
          // }, timeUntilHit);
        }
      }
    });

    // Повторяем каждые 500 мс, чтобы "захватывать" следующий диапазон
    setTimeout(this.scheduleNotesWindow, 500);
  }

  static renderLoop = () => {
    const now = performance.now();
    const currentTime = now - this.startTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.activeNotes.forEach(note => {
      const timeToHit = note.delay - currentTime;
      note.y = this.hitLine - timeToHit * this.noteSpeed;

      this.ctx.fillStyle = 'red';
      this.ctx.beginPath();
      this.ctx.roundRect(note.column * 80 - 80, note.y, 80, 40, 6);
      this.ctx.fill();
    });

    this.activeNotes = this.activeNotes.filter(note => {
      if (note.y > this.canvas.height + 100) {
        if (this.combo >= 15) {
          this.comboBreakSound.play();
        }
        this.accuracyElement.classList.add('accuracy--active');
        this.combo = 0;
        this.comboElement.innerHTML = this.combo;
        this.accuracyElement.innerHTML = 0;
        this.accuracyElement.style.color = 'red';
        setTimeout(() => {
          this.accuracyElement.classList.remove('accuracy--active');
        }, 40);
      }

      return note.y < this.canvas.height + 100;
    });

    requestAnimationFrame(this.renderLoop);
  }

  static showPausePopup(event) {
    if (event.code == 'Escape') {
      if (!this.isPaused) {
        document.querySelector('.pause-popup').classList.add('pause-popup-active');
        this.isPaused = true;
        this.music.pause();
        //отменяю запланированные тайминги появления нот
        this.timioutIds.forEach(timeout => {
          clearTimeout(timeout);
        });
        this.timioutIds = [];
      } else {
        document.querySelector('.pause-popup').classList.remove('pause-popup-active');
        this.isPaused = false;
        //обновляю тайминги появления нот
        const curentMusicTime = this.music.currentTime * 1000;
        this.currentMapObj.notes.forEach(note => {
          if (note.delay >= curentMusicTime + OFFSET) {
            let timeoutId = setTimeout(() => {
              this.activeNotes.push(note);
            }, note.delay - curentMusicTime - OFFSET);
            this.timioutIds.push(timeoutId);
          }
        });
        this.music.play();
      }
    }
  }

  static getScoreForTimingDiff(diff) {
    if (diff <= perfectDifference) return 300;
    if (diff <= normalDifference) return 100;
    if (diff <= badDifference) return 50;
    return 0; // Промах
  }

  static checkNoteHit(column) {
    const pressingTime = performance.now() - this.startTime;

    // Ищем самую близкую ноту в этой колонке
    let closestNote = null;
    let closestDiff = Infinity;
    let noteIndex = -1;

    this.activeNotes.forEach((note, i) => {
      if (note.column !== column) return;

      const diff = Math.abs(pressingTime - note.delay);
      if (diff <= badDifference && diff < closestDiff) {
        closestNote = note;
        closestDiff = diff;
        noteIndex = i;
      }
    });

    // if (!closestNote) {
    //   // Промах
    //   this.combo = 0;
    //   this.updateInfo(0);
    //   return;
    // }

    const score = this.getScoreForTimingDiff(closestDiff);

    if (score > 0) this.combo++;
    else this.combo = 0;

    this.updateInfo(score);

    // Удаляем только одну конкретную ноту
    this.activeNotes = this.activeNotes.filter(item => item.id != this.activeNotes[noteIndex].id);
  }

  //метод который обнволяет данные после нажатия (комбо, очки, аккуратность текущей ноты)
  static updateInfo(accuracy) {
    if (accuracy == 300) this.accuracyElement.style.color = '#0093c4';
    if (accuracy == 100) this.accuracyElement.style.color = '#27c400';
    if (accuracy == 50) this.accuracyElement.style.color = '#c46f00';
    this.accuracyElement.classList.add('accuracy--active');
    this.accuracyElement.innerHTML = accuracy;
    this.comboElement.classList.add('game-frame__combo-number--active');
    this.comboElement.innerHTML = this.combo;


    setTimeout(() => {
      this.accuracyElement.classList.remove('accuracy--active');
      this.comboElement.classList.remove('game-frame__combo-number--active');
    }, 40);
  }
}

export default GameScreen;