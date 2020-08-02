'use strict';
(function () {
  var SCALE_STEP = 25;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;

  var imageScaleForm = document.querySelector('.img-upload__scale');
  var imageScaleSmaller = imageScaleForm.querySelector('.scale__control--smaller');
  var imageScaleBigger = imageScaleForm.querySelector('.scale__control--bigger');
  var imageScaleInput = imageScaleForm.querySelector('.scale__control--value');
  var imageScale = document.querySelector('.img-upload__preview img');
  var scale;

  var onScaleFormClick = function (evt) {

    scale = parseInt(imageScaleInput.getAttribute('value'), 10);

    switch (evt.target) {
      case imageScaleSmaller:
        if (scale >= (MIN_SCALE + SCALE_STEP)) {
          scale -= SCALE_STEP;
          imageScale.style.transform = 'scale(' + (scale / 100) + ')';
          imageScaleInput.setAttribute('value', (scale + '%'));
        }
        break;
      case imageScaleBigger:
        if (scale <= (MAX_SCALE - SCALE_STEP)) {
          scale += SCALE_STEP;
          imageScale.style.transform = 'scale(' + (scale / 100) + ')';
          imageScaleInput.setAttribute('value', (scale + '%'));
        }
    }
  };

  imageScaleForm.addEventListener('click', onScaleFormClick);
})();
