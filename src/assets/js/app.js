(function(){
  'use strict';

  // 缩放
  var width = window.innerWidth > screen.width ? screen.width : window.innerWidth;
  var scale;
  if (width <= 768) {
    scale = width / 320 * 100;
    if (scale > 120) scale -= 20;
  } else {
    scale = 75;
  }
  document.getElementsByTagName('html')[0].style.fontSize = scale + '%';

}());
