'use strict';
(function () {
  var RANDOM_PICTURES = 10;

  var compareElements = function (left, right) {
    var result = 0;
    switch (true) {
      case left > right:
        result = -1;
        break;
      case left < right:
        result = 1;
    }
    return result;
  };

  window.sort = {
    getRandomPictures: function (images) {
      var imagesCopy = images.slice();
      var randomImages = [];

      for (var i = 0; i < RANDOM_PICTURES; i++) {
        var random = Math.floor(Math.random() * imagesCopy.length);
        randomImages.push(imagesCopy[random]);
        imagesCopy.splice(random, 1);
      }
      return randomImages;
    },
    getMostDiscussedPictures: function (images) {
      var imagesCopy = images.slice().sort(function (left, right) {
        var delta = right.comments.length - left.comments.length;
        if (delta === 0) {
          delta = compareElements(left.likes, right.likes);
        }
        return delta;
      });
      return imagesCopy;
    }
  };
})();
