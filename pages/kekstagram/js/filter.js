'use strict';
(function () {
  var picturesFilterForm = document.querySelector('.img-filters__form');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var filterButtons = document.querySelectorAll('.img-filters__button');
  var currentButton = filterDefault;

  var filter = {
    onArrayRandomChange: function () { },
    onArrayDiscussedChange: function () { },
    onArrayDefaultChange: function () { }
  };

  picturesFilterForm.addEventListener('click', function (evt) {
    filterButtons = Array.from(filterButtons);
    filterButtons.forEach(function (button) {
      if (evt.target === button) {
        evt.target.classList.add('img-filters__button--active');
      }
    });
    currentButton.classList.remove('img-filters__button--active');
    currentButton = evt.target;

    switch (evt.target) {
      case filterRandom:
        filter.onArrayRandomChange();
        break;
      case filterDiscussed:
        filter.onArrayDiscussedChange();
        break;
      case filterDefault:
        filter.onArrayDefaultChange();
    }
  });

  window.filter = filter;
})();
