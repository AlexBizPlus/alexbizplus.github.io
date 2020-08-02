'use strict';
(function () {
  var COMMENTS = 5;
  var DELAY = 2000;
  var pictures = document.querySelector('.pictures');
  var description = document.querySelector('.social__caption');
  var likes = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var commentsCurrentCount = document.querySelector('.comments-count__current');
  var commentsList = document.querySelector('.social__comments');
  var mainTag = document.querySelector('main');
  var referenceElement = document.querySelector('.img-filters');
  var previews = document.querySelectorAll('.effects__preview');
  var picturesArrayIndex = 0;

  window.render = {
    performPictures: function (drawings) {
      var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
      if (picturesArrayIndex !== 0) {
        for (var j = picturesArrayIndex; j >= 2; j--) {
          pictures.removeChild(pictures.children[j]);
        }
      }
      var fragment = document.createDocumentFragment();
      drawings.forEach(function (elem) {
        var newElement = picturesTemplate.cloneNode(true);
        newElement.querySelector('.picture__img').src = elem.url;
        newElement.querySelector('.picture__comments').textContent = elem.comments.length;
        newElement.querySelector('.picture__likes').textContent = elem.likes;
        fragment.appendChild(newElement);
      });
      pictures.appendChild(fragment);

      picturesArrayIndex = drawings.length + 1;
    },

    performContent: function (elem) {
      description.innerHTML = elem.description;
      likes.textContent = elem.likes;
      commentsCount.textContent = elem.comments.length;
      commentsCurrentCount.textContent = elem.comments.length > COMMENTS ? COMMENTS : elem.comments.length;
      commentsList.innerHTML = '';
    },

    performComments: function (firstIndex, lastIndex, elem) {
      commentsCurrentCount.textContent = lastIndex;
      var comments = document.createDocumentFragment();
      for (var i = firstIndex; i < lastIndex; i++) {
        var newElement = document.createElement('li');
        newElement.className = 'social__comment';
        var newElementImage = document.createElement('img');
        newElementImage.className = 'social__picture';
        newElementImage.src = elem.comments[i].avatar;
        newElementImage.alt = elem.comments[i].name;
        var newElementComment = document.createElement('p');
        newElementComment.className = 'social__text';
        newElementComment.innerHTML = elem.comments[i].message;
        newElement.appendChild(newElementImage);
        newElement.appendChild(newElementComment);
        comments.appendChild(newElement);
      }
      commentsList.appendChild(comments);
    },

    performSuccessSend: function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var newElement = successTemplate.cloneNode(true);
      mainTag.insertBefore(newElement, referenceElement);
    },

    performErrorSend: function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var newElement = errorTemplate.cloneNode(true);
      mainTag.insertBefore(newElement, referenceElement);
    },

    performErrorLoad: function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var newElement = errorTemplate.cloneNode(true);
      var errorMessage = newElement.querySelector('.error__title');
      errorMessage.textContent = 'Ошибка загрузки файлов. Нажмите F5';
      var closeMessage = newElement.querySelector('.error__button');
      closeMessage.classList.add('hidden');
      mainTag.insertBefore(newElement, referenceElement);
      setTimeout(function () {
        newElement.remove();
      }, DELAY);
    },

    removeMessage: function () {
      var successSection = document.querySelector('.success');
      var errorSection = document.querySelector('.error');
      if (successSection) {
        mainTag.removeChild(successSection);
      }
      if (errorSection) {
        mainTag.removeChild(errorSection);
      }
    },

    updatePreviews: function (src) {
      previews.forEach(function (elem) {
        if (elem.querySelector('img')) {
          elem.removeChild(elem.querySelector('img'));
        }
        var newElement = document.createElement('img');
        newElement.style.width = '100%';
        newElement.style.height = '100%';
        newElement.setAttribute('src', src);
        elem.appendChild(newElement);
      });
    }
  };
})();
