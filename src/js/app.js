(function($){
    'use strict';
    var $profileMenu = $('#J-ProfileMenu');
    var $body = $('body');
    window.toggleProfileMenu = function(){
        $profileMenu[$profileMenu.hasClass('on') ? 'removeClass' : 'addClass']('on');
    }
    $body.on('click', function(e){
        var $tar = $(e.target);
        if ($tar.hasClass('profile-menu') || $tar.parents('.profile-menu').length || $tar.hasClass('avatar')) {
        } else if ($profileMenu.hasClass('on')) {
            $profileMenu.removeClass('on');
        }
    });
}(jQuery));

// wgt-radios
(function($){
    'use strict';
    $('.wgt-radios').each(function(){
        $(this).children('.item').click (function() {
            var _ = $(this);
            if (!_.hasClass('active')) {
                _.addClass('active').siblings().removeClass('active');
                window.wgtRadiosCbks && window.wgtRadiosCbks[_.data('cbk')] && window.wgtRadiosCbks[_.data('cbk')].call();
            }
        })
    });
}(jQuery));

// wgt-pages
(function($){
    'use strict';

    function show($tar) {
        $tar.css({
            'transform' : 'translate3d(0,0,0)',
            'visibility' : 'visible'
        });
    }

    function hide($tar) {
        $tar.css({
            'transform' : 'translate3d(100%,0,0)',
            'visibility' : 'hidden'
        });
    }

    $('.wgt-pages').each(function(){
        var _ = $(this);
        var $prev;
        _.find('[data-target]').on('click', function(){
            var $self = $(this);
            var $tar = $($self.data('target'));
            $prev = $self.parents('.wgt-pages-page');
            show($tar);
        });
        _.find('.wgt-pages-back').on('click', function() {
            var $self = $(this);
            var $current = $self.parents('.wgt-pages-page');
            hide($current);
        });
    });

}(jQuery));
