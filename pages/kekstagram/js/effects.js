'use strict';
(function () {
  var MIN_EFFECT_CHROME = 0;
  var MIN_EFFECT_SEPIA = 0;
  var MIN_EFFECT_MARVIN = 0;
  var MIN_EFFECT_PHOBOS = 0;
  var MIN_EFFECT_HEAT = 1;
  var MAX_EFFECT_CHROME = 1;
  var MAX_EFFECT_SEPIA = 1;
  var MAX_EFFECT_MARVIN = 1;
  var MAX_EFFECT_PHOBOS = parseInt('3px', 10);
  var MAX_EFFECT_HEAT = 3;

  var effectLevelForm = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var image = document.querySelector('.img-upload__preview img');
  var filtersList = document.querySelector('.effects__list');
  var effectChrome = document.querySelector('#effect-chrome');
  var effectSepia = document.querySelector('#effect-sepia');
  var effectMarvin = document.querySelector('#effect-marvin');
  var effectPhobos = document.querySelector('#effect-phobos');
  var effectHeat = document.querySelector('#effect-heat');
  var imageScaleInput = document.querySelector('.scale__control--value');
  var effects = document.querySelectorAll('input[name = "effect"]');
  var currentFilter;
  var chosenFilter;

  var getWidth = function () {
    return parseInt(getComputedStyle(effectLevelLine).width, 10);
  };

  var reloadFilters = function () {
    image.style = '';
    imageScaleInput.setAttribute('value', '100%');
    effectLevelPin.style.left = getWidth() + 'px';
    effectLevelDepth.style.width = getWidth() + 'px';
  };

  var trasformValue = function (value, minValue, maxValue) {
    return value * (maxValue - minValue) + minValue;
  };

  window.slider.setEffectValue = function (value) {
    value = Math.round(value * 100 / getWidth(), 10) / 100;
    value = (value < 0) ? 0 : value;
    value = (value > 1) ? 1 : value;
    switch (chosenFilter.value) {
      case effectChrome.value:
        value = trasformValue(value, MIN_EFFECT_CHROME, MAX_EFFECT_CHROME);
        break;
      case effectSepia.value:
        value = trasformValue(value, MIN_EFFECT_SEPIA, MAX_EFFECT_SEPIA);
        break;
      case effectMarvin.value:
        value = trasformValue(value, MIN_EFFECT_MARVIN, MAX_EFFECT_MARVIN);
        break;
      case effectPhobos.value:
        value = trasformValue(value, MIN_EFFECT_PHOBOS, MAX_EFFECT_PHOBOS);
        break;
      case effectHeat.value:
        value = trasformValue(value, MIN_EFFECT_HEAT, MAX_EFFECT_HEAT);
    }
    effectLevelValue.setAttribute('value', value * 100);

    var effect = getComputedStyle(image).filter.split('(')[0];
    image.style.filter = effect + '(' + value + ')';
  };

  var onFiltersListClick = function () {
    reloadFilters();
    chosenFilter = Array.from(effects).find(function (elementArray) {
      return elementArray.checked;
    });
    effectLevelForm.style.display = chosenFilter.value === 'none' ? 'none' : '';
    if (currentFilter) {
      image.classList.remove('effects__preview--' + currentFilter);
    }
    image.classList.add('effects__preview--' + chosenFilter.value);
    currentFilter = chosenFilter.value;
  };


  filtersList.addEventListener('click', onFiltersListClick);

  window.effects = {
    reloadFilters: function () {
      reloadFilters();
    },
    onFiltersListClick: function () {
      onFiltersListClick();
    }
  };
})();
