class StartScreen {
  html = `
      <div class="menu-frame">
      <!-- particles.js container --> 
      <div id="particles-js"></div> 
      <div class="logo">
        <span class="music-bar bar1"></span>
        <span class="music-bar bar2"></span>
        <span class="music-bar bar3"></span>
        <span class="music-bar bar4"></span>
        <span class="music-bar bar5"></span>
      </div>
      <div class="menu-frame__menu-list">
        <div class="menu-frame__list-item" id="play-btn">Играть</div>
        <div class="menu-frame__list-item">Настройки</div>
        <div class="menu-frame__list-item">Выйти</div>
      </div>
      <div class="menu-music">
        <div class="menu-music__text">
          <div class="menu-music__name">Yuumeikyou o Wakatsu Kotoi</div>
        </div>
        <div class="menu-music__controls">
          <button class="menu-music__play">
            <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="music-icon">
              <path class="play-triangle" d="M24 18L44 32L24 46Z" fill="#fff"/>
            </svg>
          </button>
          <button class="menu-music__pause">
            <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="music-icon">
              <rect class="pause-rect" x="20" y="18" width="8" height="28" rx="2" fill="#fff" />
              <rect class="pause-rect" x="36" y="18" width="8" height="28" rx="2" fill="#fff" />
            </svg>
          </button>
          <button class="menu-music__stop">
            <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="music-icon">
              <rect class="stop-square" x="20" y="20" width="24" height="24" rx="3" fill="#fff" />
            </svg>
          </button>
        </div>
        <input type="range" class="menu-music__progres-bar" value="0" min="0" max="100">
      </div>
      <div class="menu-frame__bottom">
        <a class="menu-frame__bottom-link" href="https://github.com/ryuk3221">
          Make by @ryuk3221
          <div class="Btn">
            <span class="svgContainer">
              <svg fill="white" viewBox="0 0 496 512" height="1.6em"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
            </span>
            <span class="BG"></span>
           </div>
        </a>
      </div>
    </div>
  `;

  constructor(element) {
    this.element = element;
  }

  menuAnimate() {
    if (document.querySelector('.logo')) {
      document.querySelector('.logo').classList.add('logo--active');
    }
    if (document.querySelector('.menu-frame__menu-list')) {
      document.querySelector('.menu-frame__menu-list').classList.add('menu-frame__menu-list--active');
    }
    if (document.querySelector('.menu-music')) {
      document.querySelector('.menu-music').classList.add('menu-music--active');
    }
    if (document.querySelector('.menu-frame__bottom')) {
      document.querySelector('.menu-frame__bottom').classList.add('menu-frame__bottom--active');
    }
  }

  render() {
    this.element.innerHTML = this.html;

    setTimeout(() => {
      this.menuAnimate();
    }, 50);

    // particlesJS("particles-js", {
    //   particles: {
    //     number: { value: 9, density: { enable: true, value_area: 800 } },
    //     color: { value: "#1b1e34" },
    //     shape: {
    //       type: "polygon",
    //       stroke: { width: 0, color: "#000" },
    //       polygon: { nb_sides: 6 },
    //       image: { src: "img/github.svg", width: 100, height: 100 },
    //     },
    //     opacity: {
    //       value: 0.3,
    //       random: true,
    //       anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    //     },
    //     size: {
    //       value: 160,
    //       random: false,
    //       anim: { enable: true, speed: 10, size_min: 40, sync: false },
    //     },
    //     line_linked: {
    //       enable: false,
    //       distance: 200,
    //       color: "#ffffff",
    //       opacity: 1,
    //       width: 2,
    //     },
    //     move: {
    //       enable: true,
    //       speed: 8,
    //       direction: "none",
    //       random: false,
    //       straight: false,
    //       out_mode: "out",
    //       bounce: false,
    //       attract: { enable: false, rotateX: 600, rotateY: 1200 },
    //     },
    //   },
    //   interactivity: {
    //     detect_on: "canvas",
    //     events: {
    //       onhover: { enable: false, mode: "grab" },
    //       onclick: { enable: false, mode: "push" },
    //       resize: true,
    //     },
    //     modes: {
    //       grab: { distance: 400, line_linked: { opacity: 1 } },
    //       bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
    //       repulse: { distance: 200, duration: 0.4 },
    //       push: { particles_nb: 4 },
    //       remove: { particles_nb: 2 },
    //     },
    //   },
    //   retina_detect: true,
    // });
  }

  updateMusicProgressBar(music) {
    if (document.querySelector('.menu-music__progres-bar')) {
      const progress = document.querySelector('.menu-music__progres-bar');
      music.addEventListener('timeupdate', () => {
        const percent = music.currentTime / music.duration * 100;
        progress.value = percent;
      });
    }
  }

  showMusicName(musicObj) {
    document.querySelector('.menu-music__name').innerHTML = musicObj.songName;
  }
}

export default StartScreen;