'use strict';
(function () {
  var body = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var uploadFileMenu = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var textarea = document.querySelector('.text__description');

  var openUploadFileMenu = function () {
    body.classList.add('modal-open');
    uploadFileMenu.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.effects.onFiltersListClick();
  };

  var closeUploadFileMenu = function () {
    body.classList.remove('modal-open');
    uploadFileMenu.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFile.value = '';
    window.effects.reloadFilters();
  };

  var isHashtagsInputOnFocus = false;
  var isTextareaInputOnFocus = false;

  window.validity.hashtagsInput.addEventListener('focus', function () {
    isHashtagsInputOnFocus = true;
  });

  window.validity.hashtagsInput.addEventListener('blur', function () {
    isHashtagsInputOnFocus = false;
  });

  textarea.addEventListener('focus', function () {
    isTextareaInputOnFocus = true;
  });

  textarea.addEventListener('blur', function () {
    isTextareaInputOnFocus = false;
  });

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && !isHashtagsInputOnFocus && !isTextareaInputOnFocus) {
      evt.preventDefault();
      closeUploadFileMenu();
    }
  };

  uploadFile.addEventListener('change', function () {
    openUploadFileMenu();
  });

  uploadCancel.addEventListener('click', function () {
    closeUploadFileMenu();
  });

  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    onSubmit();
  });

  var clearForm = function () {
    uploadFile.value = '';
    window.validity.hashtagsInput.value = '';
    textarea.value = '';
    window.effects.reloadFilters();
  };

  var onSubmit = function () {
    window.backend.send(new FormData(uploadImageForm), onSuccessSend, onErrorSend);
    clearForm();
  };

  var onSuccessSend = function () {
    closeUploadFileMenu();
    window.render.performSuccessSend();
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageClick);
    var successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', function () {
      closeMessage();
    });
  };

  var onErrorSend = function () {
    closeUploadFileMenu();
    window.render.performErrorSend();
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageClick);
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      closeMessage();
    });
  };

  var closeMessage = function () {
    window.render.removeMessage();
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', onMessageClick);
  };

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  var onMessageClick = function (evt) {
    var successWindow = document.querySelector('.success__inner');
    var errorWindow = document.querySelector('.error__inner');
    if ((evt.target !== successWindow && successWindow) || (evt.target !== errorWindow && errorWindow)) {
      closeMessage();
    }
  };
})();
