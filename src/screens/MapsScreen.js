class MapsScreen {
  html = `
    <div class="maps-frame">
      <div class="maps-frame__top">
        <div class="maps-frame__map-info">
          <div class="maps-frame__map-name"></div>
          <div class="maps-frame__maps-props">
            <div class="maps-props__item">
              Длительность:
              <span class="maps-props__duration"></span>
            </div>
            <div class="maps-props__item">
              Сложность:
              <span class="maps-props__level"></span>
            </div>
            <div class="maps-props__item">
              Количество нот:
              <span class="maps-props__amount"></span>
            </div>
            <div class="maps-props__item">
              BPM:
              <span class="maps-props__bpm"></span>
            </div>
          </div>
        </div>
        <div class="maps-frame__top-right">
          <div class="search-box">
            <input class="input-search" type="text" placeholder="Поиск карты...">
            <div class="search-icon-wrapper">
              <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 20.9999L16.65 16.6499" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="sort-box">
            <div class="sort-box__text">Сортировать по:</div>
            <div class="sort-box__sort">
              <div class="sort-box__sort-head">
                Умолчанию
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="sort-box__dropdown">
                <div class="sort-item">Сложности (убыв.)</div>
                <div class="sort-item">Сложности (возрст.)</div>
                <div class="sort-item">Названию</div>
                <div class="sort-item">Умолчанию</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="maps-frame__records">
        <div class="maps-frame__records-title">Рекорды</div>
        <div class="maps-frame__records-wrapper">
          <div class="maps-frame__records-list">
            <div class="maps-frame__record">
              <div class="record__number">1.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">2.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">3.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">4.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">5.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">6.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">7.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">8.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">7.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
            <div class="maps-frame__record">
              <div class="record__number">8.</div>
              <div class="record__content">
                <div class="record__row">Очков: <span>12322</span></div>
                <div class="record__row">Аккуратность: <span>100%</span></div>
                <div class="record__row">Макс. комбо: <span>1222</span></div>
                <div class="record__row">Время: <span>06.04.2000 14:59</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="maps-frame__list">
        <div class="maps-wrapper swiper-wrapper">
          

        </div>
      </div>

      <div class="maps-frame__btn">
        Play
      </div>

      <div class="maps-frame__back-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
  <path d="M13.7826 6.97827L5.26086 15.5L13.7826 24.0218M5.26086 15.5H24.7391" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
        Назад
      </div>
    </div>
  `;

  constructor(element, maps = []) {
    this.element = element;
    this.maps = maps;
    this.currentMapIndex = 0;
  }

  render() {
    //рендерю разметку экрана с картами 
    this.element.innerHTML = this.html;

    //инициализирую слайдер карт
    const slider = new Swiper('.maps-frame__list', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      freeMode: true,
      direction: "vertical"
    });

    //рендую слайдер с картами
    this.mapsListRender();

    //отрисовываю количество звёзд
    this.setMapRating();

    //выставляю активную карту (по умолчанию первая картка активная)
    this.selectMap(this.currentMapIndex);

    window.onkeydown = null;
  }

  //метод который закрашивает звёзды
  setMapRating() {
    const starsAll = document.querySelectorAll('.stars');
    starsAll.forEach(starsParent => {
      const rate = Number(starsParent.dataset.rate);
      const starsIcons = starsParent.querySelectorAll('.star');
      starsIcons.forEach((icon, index) => {
        if (index < rate) {
          icon.style.color = "#fff";
        }
      });
    });
  }

  //метод который рендерит доступные карты
  mapsListRender() {
    const mapsWrapper = document.querySelector('.maps-wrapper');

    this.maps.forEach((map, index) => {
      const htmlComponent = `
        <div class="maps-list__item swiper-slide" id="${map.id}" data-index="${index}">
            <img src="${map.imgPath}" alt="">
            <div class="maps-list__item-content">
                <div class="maps-list__item-title">${map.title}</div>
                <div class="stars" data-rate="${map.stars}">
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
              </div>
            </div>
        </div>
      `;

      mapsWrapper.insertAdjacentHTML('beforeend', htmlComponent);
    });
  }

  selectMap(mapIndex = 0) {
    this.currentMapIndex = mapIndex;

    const mapsFrameElement = document.querySelector('.maps-frame');
    const style = `linear-gradient(86deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%), url("${this.maps[mapIndex].imgPath}")`;
    mapsFrameElement.style.backgroundImage = style;

    if (document.querySelector('.maps-list__item--active')) {
      document.querySelector('.maps-list__item--active').classList.remove('maps-list__item--active');
    }

    document.querySelector(`[data-index="${this.currentMapIndex}"]`).classList.add('maps-list__item--active');

    this.updateMapInfo(this.maps[mapIndex]);
  }

  updateMapInfo(mapObj) {
    const mapInfoBox = document.querySelector('.maps-frame__map-info');
    const mapTitleHtml = document.querySelector('.maps-frame__map-name');
    const mapDiffHtml = document.querySelector('.maps-props__level');
    const mapDurationHtml = document.querySelector('.maps-props__duration');
    const mapAmountNotesHtml = document.querySelector('.maps-props__amount');
    const mapBpmHtml = document.querySelector('.maps-props__bpm');

    mapInfoBox.classList.remove('maps-frame__map-info--show');

    mapTitleHtml.innerHTML = mapObj.title;
    mapDiffHtml.innerHTML = `${mapObj.stars}/10`;
    mapDurationHtml.innerHTML = mapObj.duration;
    mapAmountNotesHtml.innerHTML = mapObj.notes.length;
    mapBpmHtml.innerHTML = mapObj.bpm;

    setTimeout(() => {
      mapInfoBox.classList.add('maps-frame__map-info--show');
    }, 50);
  }
}

export default MapsScreen;