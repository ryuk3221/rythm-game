class GameScreen {
  html = `
    <div class="game-frame" style='background-image: linear-gradient(86deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%), url("images/map1.jpg");'>
      <div class="game-container">
        <div class="notes-container">

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
        <span class="game-frame__combo-number">12322</span>
      </div>
      <div class="game-frame__points">
        1233212
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
    this.element = element;
    this.music = null;
    this.pop.volume = 0.2;
    this.currentMapObj = currentMapObj;
    this.keys = {
      'keyS': false,
      'keyD': false,
      'keyF': false,
      'keyJ': false,
      'keyK': false,
      'keyL': false,
    }
  }

  render() {
    this.element.innerHTML = this.html;
  }

  setCurrentMap(mapObj) {
    this.currentMapObj = mapObj;
    this.music = new Audio(this.currentMapObj.musicPath);
  }

  //метод запускающий игрвоой процесс
  startGame() {
    this.controls = document.querySelector('.buttons');
    self = this;

    //инициализирую обработчик нажатий 
    window.onkeydown = event => {

      if (event.code == 'KeyS' && !self.keys[event.code]) {
        console.log(event.code);
        self.controls.querySelector('[data-column="1"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyD' && !self.keys[event.code]) {
        console.log(event.code);
        self.controls.querySelector('[data-column="2"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyF' && !self.keys[event.code]) {
        console.log(event.code);
        self.controls.querySelector('[data-column="3"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyJ' && !self.keys[event.code]) {
        console.log(event.code);
        self.controls.querySelector('[data-column="4"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyK' && !self.keys[event.code]) {
        console.log(event.code);
        self.controls.querySelector('[data-column="5"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }

      if (event.code == 'KeyL' && !self.keys[event.code]) {
        console.log(event.code);
        self.controls.querySelector('[data-column="6"]').classList.add('active');
        self.keys[event.code] = true;
        self.pop.currentTime = 0;
        self.pop.play();
      }
    }

    window.onkeyup = event => {
      self.keys[event.code] = false;
      self.controls.querySelector(`[data-key="${event.code}"]`).classList.remove('active');
    }
  }
}

export default GameScreen;