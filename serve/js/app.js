(function(){
    'use strict';

    // 基础宽度 320px 最大支持到 414px
    var scale = parseInt((window.innerWidth / 320) * 100);
    if (scale > 129) {
        scale = 129;
    }
    document.getElementsByTagName('html')[0].style.fontSize = scale + '%';

}());
