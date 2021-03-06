'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;
  window.debounce = function (cb) {

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb();
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
