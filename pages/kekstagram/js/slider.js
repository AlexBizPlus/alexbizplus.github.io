'use strict';
(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var coords;

  var slider = {
    setEffectValue: function (value) {
      return value;
    }
  };

  effectLevelLine.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;

      startCoordX = moveEvt.clientX;

      coords = effectLevelPin.offsetLeft - shift;

      if (coords >= 0 && coords <= parseInt(getComputedStyle(effectLevelLine).width, 10)) {
        effectLevelPin.style.left = (coords) + 'px';
        effectLevelDepth.style.width = (coords) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      slider.setEffectValue(coords);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.slider = slider;
})();
