// Module Tipster
angular.module('tipster', [])

.controller('tipsperController', ['$scope', function ($scope) {

    $scope.title = 'Angular Super Tipster';
}])

// Directives
.directive('superTipster', function () {

    return {
        restrict: 'E',
        scope: {
            width: '@'
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
            var position = element.position();

            // add .ios class to body
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                $('body').addClass('ios-device')
            }

            // if-width method
            var widthOverride = function (value) {

                if (value) {

                    var doWidth = scope.width;

                    theTipster.css({
                        'width': doWidth,
                        'left': -(doWidth / 2) * .75
                    })
                } else {
                    //
                }
            };

            ctrl.popupTipster = function () {

                ctrl.openedTipster = !ctrl.openedTipster;

                if (ctrl.openedTipster) {

                    // Width conditions
                    if (position.left >= firstRight && position.left < secondRight) {

                        theTipster.show(ctrl.setTimed).addClass('middle');

                        widthOverride(scope.width);

                    } else if (position.left >= secondRight && position.left < viewportWidth) {

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

                console.log('doc clicked');

                event.preventDefault();
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
