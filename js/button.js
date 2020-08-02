(function () {
  var button = document.getElementById('button-portfolio');
  var portfolio = document.getElementsByClassName('portfolio')[0];

  var onButtonClick = function (evt) {
    evt.preventDefault();
    portfolio.scrollIntoView(top);
  }

  button.addEventListener('click', onButtonClick);
})();
