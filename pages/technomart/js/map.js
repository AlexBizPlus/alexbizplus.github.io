var mapLink = document.querySelector('.map-link');
var mapPopup = document.querySelector('.map');
var mapClose = mapPopup.querySelector('.modal-close');

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  mapPopup.classList.add('modal-show');
});

mapClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove('modal-show');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (mapPopup.classList.contains('modal-show')) {
      mapPopup.classList.remove('modal-show');
    }
  }
});
