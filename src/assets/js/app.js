(function(){
  'use strict';

  // 缩放
  var width = window.innerWidth > screen.width ? screen.width : window.innerWidth;
  var scale = width / 320 * 100;
  if (scale > 110) scale -= 10;
  document.getElementsByTagName('html')[0].style.fontSize = scale + '%';

}());
