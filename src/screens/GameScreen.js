import { DEFAULT_MUSIC_VOLUME, OFFSET } from "../constants";
import { perfectDifference, normalDifference, badDifference } from "../constants";

class GameScreen {
  html = `
    <div class="game-frame" style='background-image: linear-gradient(86deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%), url("images/map1.jpg");'>
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

  pop = new Audio('../../sounds/drum-hitclap.mp3');
  comboBreakSound = new Audio('../../sounds/combobreak.mp3');

  constructor(element, currentMapObj = null) {
    self = this;
    this.element = element;
    this.music = null;
    this.pop.volume = 0.12;
    this.comboBreakSound.volume = 0.12;
    this.currentMapObj = currentMapObj;
    this.isPaused = false;
    this.keys = {
      'keyN': false,
      'keyM': false,
      'keyF': false,
      'keyJ': false,
      'keyK': false,
      'keyL': false,
    };
    this.animationId = null;
    this.activeNotes = [];
    this.timioutIds = [];
    this.combo = 0;
    this.points = 0;
    this.healts = 10;
    this.renderWindow = 3000;  // отображаем только ноты, которые появятся в ближайшие 3 секунды
    this.appearBeforeHit = 1500; // нота появляется за 1.5 сек до удара
    this.noteSpeed = 0.7;
    this.hitLine = 760;
    this.playedNotes = new Set();
  }

  render() {
    this.element.innerHTML = this.html;
    //после рендера разметки, получаю canvas и контекст
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.accuracyElement = document.querySelector('.accuracy');
    this.comboElement = document.querySelector('.game-frame__combo-number');
    this.healtsElement = document.querySelector('.healts-progress');

    this.controls = document.querySelector('.buttons');

    //обнуляю координаты нот
    this.currentMapObj.notes.forEach(note => { if (note.y) note.y = 0; });

    //инициализирую обработчик нажатий 
    window.onkeydown = event => {

      if (event.code == 'KeyS' && !self.keys[event.code]) {
        self.controls.querySelector('[data-column="1"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
        self.checkNoteHit(1);
      }

      if (event.code == 'KeyN' && !self.keys[event.code]) {
        this.checkNoteHit(2);
        this.controls.querySelector('[data-column="2"]').classList.add('active');
        this.keys[event.code] = true;
        this.pop.currentTime = 0;
        this.pop.play();

      }

      if (event.code == 'KeyM' && !self.keys[event.code]) {
        this.checkNoteHit(3);
        this.controls.querySelector('[data-column="3"]').classList.add('active');
        this.keys[event.code] = true;
        this.pop.currentTime = 0;
        this.pop.play();
      }

      if (event.code == 'KeyJ' && !self.keys[event.code]) {
        this.controls.querySelector('[data-column="4"]').classList.add('active');
        this.keys[event.code] = true;
        this.pop.currentTime = 0;
        this.pop.play();
        this.checkNoteHit(4);
      }

      if (event.code == 'KeyK' && !self.keys[event.code]) {
        this.controls.querySelector('[data-column="5"]').classList.add('active');
        this.keys[event.code] = true;
        this.pop.currentTime = 0;
        this.pop.play();
        this.checkNoteHit(5);
      }

      if (event.code == 'KeyL' && !self.keys[event.code]) {
        this.controls.querySelector('[data-column="6"]').classList.add('active');
        this.keys[event.code] = true;
        this.pop.currentTime = 0;
        this.pop.play();
        this.checkNoteHit(6);
      }
    }

    window.onkeyup = event => {
      self.keys[event.code] = false;

      if (self.controls.querySelector(`[data-key="${event.code}"]`)) {
        self.controls.querySelector(`[data-key="${event.code}"]`).classList.remove('active');
      }
    }
  }

  setCurrentMap(mapObj) {
    this.currentMapObj = mapObj;
    this.music = new Audio(this.currentMapObj.musicPath);
  }

  //--------новый метод
  newStartGame = () => {
    this.music.currentTime = 0;
    this.music.volume = DEFAULT_MUSIC_VOLUME;
    this.music.play();
    this.startTime = performance.now();

    //планирую появление нот в ближайшие 3 сек
    this.scheduleNotesWindow();
    requestAnimationFrame(this.renderLoop);
  }


  scheduleNotesWindow = () => {
    const now = performance.now();
    const currentTime = now - this.startTime;

    self.currentMapObj.notes.forEach(note => {
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

  renderLoop = () => {
    const now = performance.now();
    const currentTime = now - self.startTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.activeNotes.forEach(note => {
      const timeToHit = note.delay - currentTime;
      note.y = this.hitLine - timeToHit * this.noteSpeed;

      this.ctx.fillStyle = 'red';
      this.ctx.beginPath();
      this.ctx.roundRect(note.column * 80 - 80, note.y, 80, 40, 6);
      this.ctx.fill();
    });

    this.activeNotes.filter(note => note.y < this.canvas.height + 100);

    requestAnimationFrame(this.renderLoop);
  }



  //метод запускающий игрвоой процесс
  // startGame() {
  //   this.healts = 10;

  //   this.activeNotes.length = 0;
  //   this.controls = document.querySelector('.buttons');

  //   //запустить рендеринг нот и музыку с задержкой для подготовки к игре
  //   setTimeout(() => {
  //     //запускаю цикл анимации нот
  //     this.renderNotes();
  //     //запускаю цикл который создает ноту с задержкой согласно таймингу 
  //     this.currentMapObj.notes.forEach(note => {
  //       //сохраняю id таймаута, и пушу данный id в массив, чтобы в дальнейшем отменять текущие таймауты
  //       let timeoutId = setTimeout(() => {
  //         this.activeNotes.push(note);
  //         // setTimeout(() => {
  //         //   this.pop.currentTime = 0;
  //         //   this.pop.play();
  //         // }, OFFSET);
  //       }, note.delay);
  //       this.timioutIds.push(timeoutId);
  //     });

  //     setTimeout(() => {
  //       this.music.currentTime = 0;
  //       this.music.volume = DEFAULT_MUSIC_VOLUME;
  //       this.music.play();
  //     }, OFFSET);


  //   }, 1000);
  // }

  // renderNotes() {
  //   const fps = 100;
  //   let startTime = 0;
  //   let lastTime = 0;

  //   const notesAnimate = (timeStamp) => {
  //     if (timeStamp - startTime >= 1000 / fps) {

  //       this.activeNotes.forEach((note, index) => {
  //         if (!this.isPaused) {
  //           note.y += 12;
  //           this.ctx.fillStyle = 'red';
  //           this.ctx.beginPath();
  //           this.ctx.roundRect(note.column * 80 - 80, note.y, 80, 40, 6);
  //           this.ctx.fill();
  //         }
  //       });

  //       //Удаление вышедших за границы (то есть промах)
  //       this.activeNotes.filter((note, index) => {
  //         if (note.y >= this.canvas.height + 80) {
  //           if (this.combo > 15) {
  //             this.comboBreakSound.play();
  //           }
  //           if (this.healts >= 1) {
  //             this.healts--;
  //             this.healtsElement.style.width = `${this.healts * 10}%`
  //           } else {
  //             //код который будет выполняться когда игрок сфэйлил
  //             //ставлю мызку на паузу
  //             this.music.pause();
  //             //отменяю запланированные тайминги появления нот
  //             self.timioutIds.forEach(timeout => {
  //               clearTimeout(timeout);
  //             });
  //             self.timioutIds = [];
  //             self.activeNotes = [];
  //             //отображаю окно фейла
  //             document.querySelector('.fale-popup').classList.add('fale-popup--show');
  //           }
  //           this.activeNotes.splice(index, 1);
  //           this.accuracyElement.classList.add('accuracy--active');
  //           this.combo = 0;
  //           this.comboElement.innerHTML = this.combo;
  //           this.accuracyElement.innerHTML = 0;
  //           this.accuracyElement.style.color = 'red';
  //           setTimeout(() => {
  //             this.accuracyElement.classList.remove('accuracy--active');
  //           }, 40);
  //           return;
  //         }

  //         return note;
  //       });

  //       startTime = timeStamp;
  //     }

  //     this.animationId = requestAnimationFrame(notesAnimate);
  //   }

  //   notesAnimate();
  // }

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
  checkNoteHit(column) {
    const activeNotesLength = this.activeNotes.length;
    const pressingTiming = performance.now() - this.startTime;
    let checkedNote;

    for (let i = activeNotesLength - 1; i >= 0; i--) {
      if (this.activeNotes[i].column == column) {
        checkedNote = this.activeNotes[i];
        const timingDifference = Math.abs(pressingTiming - checkedNote.delay);
        if (timingDifference < 400) {
          if (timingDifference < perfectDifference) {
            this.combo++;
            this.updateInfo(300);
            this.activeNotes.splice(i, 1);
            return;
          }
          if (timingDifference < normalDifference) {
            this.combo++;
            this.updateInfo(100);
            this.activeNotes.splice(i, 1);
            return;
          }
          if (timingDifference < badDifference) {
            this.combo++;
            this.updateInfo(50);
            this.activeNotes.splice(i, 1);
            return;
          }
        }
      }
    }
  }

  //метод который обнволяет данные после нажатия (комбо, очки, аккуратность текущей ноты)
  updateInfo(accuracy) {
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