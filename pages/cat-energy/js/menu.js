var button=document.querySelector(".header__button"),menu=document.querySelector(".header__nav"),showMenu=function(){button&&(button.classList.add("header__button_open"),menu.classList.add("header__hide-menu"),button.addEventListener("click",function(){return button.classList.contains("header__button_close")?(button.classList.remove("header__button_close"),button.classList.add("header__button_open"),void menu.classList.add("header__hide-menu")):button.classList.contains("header__button_open")?(button.classList.remove("header__button_open"),button.classList.add("header__button_close"),void menu.classList.remove("header__hide-menu")):void 0}))};showMenu(),window.onresize=function(){button.classList.remove("header__button_close"),button.classList.remove("header__button_open"),menu.classList.add("header__hide-menu"),button.classList.add("header__button_open")};