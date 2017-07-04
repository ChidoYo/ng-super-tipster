
// Directives
angular.module('tipster').directive('superTipster', function () {

    return {
        restrict: 'E',
        scope: {
            width: '@',
            label: '@'
        },
        controller: function () {

            this.popupTipster;
            this.openedTipster = false;
            this.setTimed;
        },
        link: function (scope, element, attrs, ctrl) {

            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            var theTipster = element.find('.super-tipster');
            // var tipsterWidth = theTipster.width();
            var viewportWidth = $(window).width();
            var firstRight = (viewportWidth / 3);
            var secondRight = (viewportWidth / 3) * 2;
            var offset = element.offset();

            // add .ios class to body
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                $('body').addClass('ios-device')
            }

            // if-width method
            var widthOverride = function (value) {

                if (value) {

                    // console.log('override width to ', value);

                    var doWidth = scope.width;

                    theTipster.css({
                        'width': doWidth,
                        'left': -(doWidth / 2) * .75
                    })
                } else {

                    // console.log('default width of 200px');
                }
            };

            ctrl.popupTipster = function () {

                ctrl.openedTipster = !ctrl.openedTipster;

                if (ctrl.openedTipster) {

                    // Width conditions
                    if (offset.left >= firstRight && offset.left < secondRight) {

                        theTipster.show(ctrl.setTimed).addClass('middle');

                        widthOverride(scope.width);

                    } else if (offset.left >= secondRight && offset.left < viewportWidth) {

                        theTipster.show(ctrl.setTimed).addClass('right');

                        widthOverride(scope.width);

                    } else {

                        theTipster.show(ctrl.setTimed);

                        widthOverride(scope.width);
                    }

                } else {

                    theTipster.hide(ctrl.setTimed).removeClass('middle right');
                }
            };

            $(document).on('click', function (event) {

                var itemClick = element.find(event.target).length > 0;

                if (itemClick) {
                    return;
                }

                scope.$apply(function () {
                    ctrl.openedTipster = false;
                    theTipster.hide(ctrl.setTimed);
                });
            });
        }
    }
})

.directive('tipsterTrigger', function () {

    return {
        restrict: 'A',
        require: '^^superTipster',
        scope: {},
        link: function (scope, element, attrs, ctrl) {

            // Detect click
            element.on('click', function (event) {

                event.preventDefault();
                ctrl.popupTipster();
            });
        }
    }
})

.directive('closeTipster', function () {

    return {
        restrict: 'A',
        require: '^^superTipster',
        scope: {},
        link: function (scope, element, attrs, ctrl) {

            element.on('click', function (event) {

                event.preventDefault();
                ctrl.popupTipster();
            });
        }
    }
});
