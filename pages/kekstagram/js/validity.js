'use strict';
(function () {
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;

  var hashtagsInput = document.querySelector('input[name="hashtags"]');
  var commentsInput = document.querySelector('textarea[name="description"]');

  var checkRepeatedElements = function (hashtags) {
    var hashtagsLowerCase = hashtags.map(function (element, i) {
      if (i === 0) {
        return element;
      }
      return element.toLowerCase();
    });
    var result = false;
    hashtagsLowerCase.forEach(function (oldElem, oldIndex) {
      var newResult = hashtagsLowerCase.some(function (elem, index) {
        return oldElem === elem && oldIndex !== index;
      });
      result = result || newResult;
    });
    return result;
  };

  var checkAllowedChars = function (string, symbol) {
    var symbols = [];
    string.split('').map(function (char) {
      symbols.push(symbol.test(char));
    });
    symbols[0] = false;
    return symbols.every(function (elem) {
      return elem === false;
    });
  };

  var checkHashtagsInput = function (hashtagsInputArray) {
    var pattern = /^#{1}[\da-zA-Zа-яА-Я]{1,19}$/;
    var noPattern = /[^\da-zA-Zа-яА-Я]/;
    var hashtagsArray = (hashtagsInputArray.value.trim()).split(' ');
    var errors = '';
    if (hashtagsArray.length > 5) {
      errors += 'Введите не более 5 хэштегов через пробел без запятых. ';
    } else if (checkRepeatedElements(hashtagsArray)) {
      errors += 'Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. ';
    } else {
      hashtagsArray.map(function (elem, i) {
        if (!pattern.test(elem)) {
          var index = ++i;
          if (elem[0] !== '#') {
            errors += 'Хэштег номер ' + index + ': должен начинаться со символа #. ';
          }
          if (elem.length < MIN_HASHTAG_LENGTH) {
            errors += 'Хэштег номер ' + index + ': должно быть не менее ' + MIN_HASHTAG_LENGTH + ' символов, включая решётку. ';
          }
          if (elem.length > MAX_HASHTAG_LENGTH) {
            errors += 'Хэштег номер ' + index + ': должно быть не более ' + MAX_HASHTAG_LENGTH + ' символов, включая решётку. ';
          }
          if (!checkAllowedChars(elem, noPattern)) {
            errors += 'Хэштег номер ' + index + ': после символа # хештег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. ';
          }
          errors = (hashtagsInputArray.value === '') ? '' : errors;
        }
      });
    }
    hashtagsInput.style.boxShadow = (errors === '') ? '' : '0 0 0 4px rgb(255, 0, 0)';

    return errors;
  };

  hashtagsInput.addEventListener('input', function () {
    if (hashtagsInput === '') {
      hashtagsInput.setCustomValidity('');
      return;
    }
    hashtagsInput.setCustomValidity(checkHashtagsInput(hashtagsInput));
  });

  var checkCommentsInput = function (comment) {
    var error;
    if (comment.length > MAX_COMMENT_LENGTH) {
      error = 'Длина комментария не может составлять больше 140 символов. Текущее количество символов: ' + comment.length;
      commentsInput.style.boxShadow = '0 0 0 4px rgb(255, 0, 0)';
      return error;
    }
    error = '';
    commentsInput.style.boxShadow = '';
    return error;
  };

  commentsInput.addEventListener('input', function () {
    if (commentsInput === '') {
      commentsInput.setCustomValidity('');
      return;
    }
    commentsInput.setCustomValidity(checkCommentsInput(commentsInput.value));
  });

  window.validity = {
    hashtagsInput: hashtagsInput
  };
})();
