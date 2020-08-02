'use strict';
(function () {
  var TIMEOUT_IN_MS = 15000;
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_SEND = 'https://javascript.pages.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  var httpRequest = function (data, method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        return;
      }
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      httpRequest('', 'GET', URL_LOAD, onSuccess, onError);
    },

    send: function (data, onSuccess, onError) {
      httpRequest(data, 'POST', URL_SEND, onSuccess, onError);
    }
  };
})();
