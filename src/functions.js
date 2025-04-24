//ф-ия которая обновляет progress bar музыки в на главном экране
export function updateMusicProgressBar(music) {
  if (document.querySelector('.menu-music__progres-bar')) {
    const progress = document.querySelector('.menu-music__progres-bar');
    music.addEventListener('timeupdate', () => {
      const percent = music.currentTime / music.duration * 100;
      progress.value = percent;
    });
  }
}