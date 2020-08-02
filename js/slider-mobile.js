(function () {
  var sliderList = document.getElementById('slider-list');
  var sliderLink = document.getElementById('slider-link');
  var elements = sliderList.getElementsByTagName('input');
  var getCurrentIndex = function (index) {
    return index = Array.from(elements).findIndex(function (elementArray) {
      return elementArray.checked;
    });
  };

  var currentElement = getCurrentIndex(currentElement);

  sliderLink.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;
    var shift;
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      shift = startCoordX - moveEvt.clientX;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          sliderLink.removeEventListener('click', onClickPreventDefault);
        };

        sliderLink.classList.remove(`slider__link--${elements[currentElement].id}`);
        elements[currentElement].checked = false;

        if (shift < -2) {
          currentElement = (currentElement >= 1) ? --currentElement : elements.length - 1;
        }

        if (shift > 2) {
          currentElement = (currentElement < elements.length - 1) ? ++currentElement : 0;
        }
        sliderLink.classList.add(`slider__link--${elements[currentElement].id}`);
        sliderLink.href = elements[currentElement].value;
        elements[currentElement].checked = true;

        sliderLink.addEventListener('click', onClickPreventDefault);
      }

      if (!dragged) {
        var onSliderLinkClick = function () {
          for (var i = 0; i < elements.length; i++) {
            elements[i].checked = false;
          }
          elements[0].checked = true;
          currentElement = 0;
          sliderLink.removeEventListener('click', onClickPreventDefault);
        };

        sliderLink.addEventListener('click', onSliderLinkClick);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onSliderListClick = function (evt) {
    for (var i = 0; i < elements.length; i++) {
      if (evt.target === elements[i] && evt.target !== elements[currentElement]) {

        sliderLink.classList.remove(`slider__link--${elements[currentElement].id}`);
        elements[currentElement].checked = false;

        sliderLink.classList.add(`slider__link--${evt.target.id}`);
        sliderLink.href = evt.target.value;

        currentElement = evt.target.id;
      }
    }
  };
  sliderList.addEventListener('click', onSliderListClick);

  var onSliderLinkClick = function () {
    for (var i = 0; i < elements.length; i++) {
      elements[i].checked = false;
    }
    elements[0].checked = true;
    currentElement = 0;
    sliderLink.removeEventListener('click', onClickPreventDefault);
  };

  sliderLink.addEventListener('click', onSliderLinkClick);

})();
