$(function() {

    $('[tipster-view]').superTipster();

});

// my jQuery plugin
(function($) {

    $.fn.superTipster = function() {

        console.log('POW!');

        return this.each(function() {

            var clicker = $(this);
            var viewportWidth = $(window).width();
            var firstRight = (viewportWidth / 3);
            var secondRight = (viewportWidth / 3) * 2;
            var pos = clicker.position();
            var styles = {};

            console.log('secondRight', secondRight);

            clicker.on('click', function(e) {
                console.log('Clicked!');

                e.stopPropagation();
                e.preventDefault();

                console.log('Top: ' + pos.top + ' Left: ' + pos.left);

                styles = {
                    top: pos.top,
                    left: pos.left
                };

                // Width conditions
                if (pos.left >= firstRight && pos.left < secondRight) {
                    console.log('in the very middle!');
                    $('#tipster')
                        .addClass('is-open middle')
                        .css(styles);
                } else if (pos.left >= secondRight && pos.left < viewportWidth) {
                    console.log('3rd third!');
                    $('#tipster')
                        .addClass('is-open right')
                        .css(styles);
                } else {
                    console.log('Nothing');
                    $('#tipster')
                        .addClass('is-open')
                        .css(styles);
                }

                $(document).one('click', function closeItem (e) {
                    if($('#tipster').has(e.target).length === 0) {
                        $('#tipster').removeClass('is-open middle right');
                    } else {
                        $(document).one('click', closeItem);
                    }
                });
            });
        });
    }
}(jQuery));
