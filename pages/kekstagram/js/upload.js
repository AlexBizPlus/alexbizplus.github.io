'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#upload-file');
  var image = document.querySelector('.img-upload__preview img');


  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        image.src = reader.result;
        window.render.updatePreviews(image.src);
      });

      reader.readAsDataURL(file);
    }
  });
})();
