class GameScreen {
  html = `
    <div class="game-frame" style='background-image: linear-gradient(86deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%), url("images/map1.jpg");'>
      <div class="game-container">
        <div class="notes-container">

        </div>
        <div class="buttons">
          <div data-key="1">S</div>
          <div data-key="2">D</div>
          <div data-key="3">F</div>
          <div data-key="4">J</div>
          <div data-key="5">K</div>
          <div data-key="6">L</div>
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
    this.pop.volume = 0.5;
    this.currentMapObj = currentMapObj;
  }

  render() {
    this.element.innerHTML = this.html;

    // window.addEventListener('keydown', event => {
    //   this.pop.currentTime = 0;
    //   this.pop.play();
    // });
  }

  setCurrentMap(mapObj) {
    this.currentMapObj = mapObj;
    this.music = new Audio(this.currentMapObj.musicPath);
  }

  //метод запускающий игрвоой процесс
  startGame() {
    this.controls = document.querySelector('.buttons');
    console.log(this.controls);

    //инициализирую обработчик нажатий 
    window.onkeydown = event => {
      this.pop.currentTime = 0;
      this.pop.play();
    }
  }
}

export default GameScreen;