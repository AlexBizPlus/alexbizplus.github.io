'use strict';
(function () {
  var body = document.querySelector('body');
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var closePicture = document.querySelector('#picture-cancel');
  var image = bigPicture.querySelector('.big-picture__img img');
  var commentsLoader = document.querySelector('.comments-loader');
  var likesCount = document.querySelector('.likes-count');
  var likeToggle = true;

  var picture = {
    onImageClick: function (id) {
      return id;
    },
    onLoadCommentsClick: function () { }
  };

  var openBigPicture = function (src) {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPictureEscPress);
    image.setAttribute('src', src);
    likesCount.addEventListener('click', onLikesClick);
    pictures.removeEventListener('keydown', onPicturesEnterPress);
  };

  var closeBigPicture = function () {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEscPress);
    likesCount.removeEventListener('click', onLikesClick);
    likeToggle = true;
    likesCount.dataset.color = 'no';
    pictures.addEventListener('keydown', onPicturesEnterPress);
  };

  var onLikesClick = function () {
    if (likeToggle) {
      likesCount.textContent = parseInt(likesCount.textContent, 10) + 1;
      likesCount.dataset.color = 'yes';
      likeToggle = false;
      return;
    }
    likesCount.textContent = parseInt(likesCount.textContent, 10) - 1;
    likesCount.dataset.color = 'no';
    likeToggle = true;
  };

  var onPictureEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  var onPicturesEnterPress = function (evt) {
    if (evt.target.className === 'picture' && evt.key === 'Enter' && !body.classList.contains('modal-open')) {
      evt.preventDefault();
      var id = evt.target.children[0].getAttribute('src');
      picture.onImageClick(id);
      openBigPicture(id);
    }
  };

  pictures.addEventListener('click', function (evt) {
    if (evt.target.className === 'picture__img') {
      var id = evt.target.getAttribute('src');
      picture.onImageClick(id);
      openBigPicture(id);
    }
  });

  pictures.addEventListener('keydown', onPicturesEnterPress);

  closePicture.addEventListener('click', function () {
    closeBigPicture();
  });

  commentsLoader.addEventListener('click', function () {
    picture.onLoadCommentsClick();
  });

  window.picture = picture;
})();
