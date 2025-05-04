import { DEFAULT_MUSIC_VOLUME, OFFSET } from "../constants";

class GameScreen {
  html = `
    <div class="game-frame" style='background-image: linear-gradient(86deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%), url("images/map1.jpg");'>
      <div class="game-container">
        <div class="canvas-wrapper">
          <canvas width="480" height="800">

          </canvas>
        </div>
        <div class="buttons">
          <div data-column="1" data-key="KeyS">S</div>
          <div data-column="2" data-key="KeyD">D</div>
          <div data-column="3" data-key="KeyF">F</div>
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

  pop = new Audio('../../sounds/drum-hitclap.mp3');

  constructor(element, currentMapObj = null) {
    self = this;
    this.element = element;
    this.music = null;
    this.pop.volume = 0.01;
    this.currentMapObj = currentMapObj;
    this.isPaused = false;
    this.keys = {
      'keyS': false,
      'keyD': false,
      'keyF': false,
      'keyJ': false,
      'keyK': false,
      'keyL': false,
    };
    this.animationId = null;
    this.activeNotes = [];
    this.timioutIds = [];
  }

  render() {
    this.element.innerHTML = this.html;
    //после рендера разметки, получаю canvas и контекст
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  setCurrentMap(mapObj) {
    this.currentMapObj = mapObj;
    this.music = new Audio(this.currentMapObj.musicPath);
  }

  //метод запускающий игрвоой процесс
  startGame() {
    this.controls = document.querySelector('.buttons');

    //инициализирую обработчик нажатий 
    window.onkeydown = event => {

      if (event.code == 'KeyS' && !self.keys[event.code]) {
        self.controls.querySelector('[data-column="1"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
        self.checkNoteHit();
      }

      if (event.code == 'KeyD' && !self.keys[event.code]) {
        self.controls.querySelector('[data-column="2"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyF' && !self.keys[event.code]) {
        self.controls.querySelector('[data-column="3"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyJ' && !self.keys[event.code]) {
        self.controls.querySelector('[data-column="4"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyK' && !self.keys[event.code]) {
        self.controls.querySelector('[data-column="5"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyL' && !self.keys[event.code]) {
        self.controls.querySelector('[data-column="6"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }
    }

    window.onkeyup = event => {
      self.keys[event.code] = false;

      if (self.controls.querySelector(`[data-key="${event.code}"]`)) {
        self.controls.querySelector(`[data-key="${event.code}"]`).classList.remove('active');
      }
    }

    //запустить рендеринг нот и музыку с задержкой для подготовки к игре
    setTimeout(() => {
      //запускаю цикл анимации нот
      this.renderNotes();
      //запускаю цикл который создает ноту с задержкой согласно таймингу 
      this.currentMapObj.notes.forEach(note => {
        //сохраняю id таймаута, и пушу данный id в массив, чтобы в дальнейшем отменять текущие таймауты
        let timeoutId = setTimeout(() => {
          this.activeNotes.push(note);
          // setTimeout(() => {
          //   this.pop.currentTime = 0;
          //   this.pop.play();
          // }, OFFSET);
        }, note.delay);
        this.timioutIds.push(timeoutId);
      });

      setTimeout(() => {
        this.music.currentTime = 0;
        this.music.volume = DEFAULT_MUSIC_VOLUME;
        this.music.play();
      }, OFFSET);

     
    }, 1000);
  }

  renderNotes() {
    const fps = 100;
    let startTime = 0;
    let lastTime = 0;

    const notesAnimate = (timeStamp) => {
      if (timeStamp - startTime >= 1000 / fps) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.activeNotes.forEach((note, index) => {
          if (!this.isPaused) {
            note.y += 12;
            this.ctx.fillStyle = 'red';
            this.ctx.beginPath();
            this.ctx.roundRect(note.column * 80 - 80, note.y, 80, 40, 6);
            this.ctx.fill();

          }
        });

        //ВУдаление вышедших за границы
        this.activeNotes = this.activeNotes.filter(note => note.y <= this.canvas.height);

        startTime = timeStamp;
      }

      this.animationId = requestAnimationFrame(notesAnimate);
    }

    notesAnimate();
  }

  showPausePopup(event) {
    if (event.code == 'Escape') {
      if (!self.isPaused) {
        document.querySelector('.pause-popup').classList.add('pause-popup-active');
        self.isPaused = true;
        self.music.pause();
        //отменяю запланированные тайминги появления нот
        self.timioutIds.forEach(timeout => {
          clearTimeout(timeout);
        });
        self.timioutIds = [];
      } else {
        document.querySelector('.pause-popup').classList.remove('pause-popup-active');
        self.isPaused = false;
        //обновляю тайминги появления нот
        const curentMusicTime = self.music.currentTime * 1000;
        self.currentMapObj.notes.forEach(note => {
          if (note.delay >= curentMusicTime + OFFSET) {
            let timeoutId = setTimeout(() => {
              self.activeNotes.push(note);
            }, note.delay - curentMusicTime - OFFSET);
            self.timioutIds.push(timeoutId);
          }
        });
        self.music.play();
      }
    }
  }

  //метод которй отслеживает попадание
  checkNoteHit() {
    const activeNotesLength = self.activeNotes.length;
    const pressingTiming = parseFloat(this.music.currentTime.toFixed(3)) * 1000;
    console.log(activeNotesLength);
    console.log(pressingTiming);
  }
}

export default GameScreen;