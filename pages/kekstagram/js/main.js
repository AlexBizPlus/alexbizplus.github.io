'use strict';
(function () {
  var COMMENTS = 5;

  var picturesFilter = document.querySelector('.img-filters--inactive');
  var commentsLoader = document.querySelector('.comments-loader');
  var images = [];
  var mainImage;
  var clickCounter = 0;

  var updatePictures = function (drawings) {
    window.render.performPictures(drawings);
  };

  window.filter.onArrayRandomChange = window.debounce(function () {
    updatePictures(window.sort.getRandomPictures(images));
  });

  window.filter.onArrayDiscussedChange = window.debounce(function () {
    updatePictures(window.sort.getMostDiscussedPictures(images));
  });

  window.filter.onArrayDefaultChange = window.debounce(function () {
    updatePictures(images);
  });

  window.picture.onImageClick = function (id) {
    mainImage = images.find(function (elements) {
      return elements.url === id;
    });
    window.render.performContent(mainImage);
    window.render.performComments(0, (mainImage.comments.length >= COMMENTS ? COMMENTS : mainImage.comments.length), mainImage);
    clickCounter = 1;
    if (mainImage.comments.length >= COMMENTS) {
      commentsLoader.classList.remove('hidden');
      return;
    }
    commentsLoader.classList.add('hidden');
  };

  window.picture.onLoadCommentsClick = function () {
    var lastComment = (mainImage.comments.length <= ((clickCounter + 1) * COMMENTS)) ? mainImage.comments.length : ((clickCounter + 1) * COMMENTS);

    window.render.performComments((clickCounter * COMMENTS), lastComment, mainImage);

    if (lastComment === mainImage.comments.length) {
      commentsLoader.classList.add('hidden');
    }
    clickCounter++;
  };

  var onSuccessLoad = function (data) {
    images = data;
    updatePictures(data);
    picturesFilter.style.opacity = 1;
  };

  var onErrorLoad = function () {
    window.render.performErrorLoad();
  };

  window.backend.load(onSuccessLoad, onErrorLoad);
})();
