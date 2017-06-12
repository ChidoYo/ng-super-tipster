'use strict';

// Module Tipster
var tipster = angular.module('tipster', []);

tipster.controller('tipsperController', function ($scope) {

    $scope.title = 'Angular Super Tipster';
});


// Directives
tipster.directive('superTipster', function () {

    return {
        restrict: 'E',
        scope: {},
        controller: function ($scope) {

            this.popupTipster;
            this.openedTipster = false;
            this.setTimed;
        },
        controllerAs: 'super',
        link: function (scope, element, attrs, ctrl) {

            var theTipster = element.find('.super-tipster');

            ctrl.popupTipster = function () {

                ctrl.openedTipster = !ctrl.openedTipster;

                if (ctrl.openedTipster) {
                    theTipster.show(ctrl.setTimed);
                } else {
                    theTipster.hide(ctrl.setTimed);
                }
            };

            $(document).on('click', function (e) {

                e.preventDefault();
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
});

tipster.directive('tipsterTrigger', function () {

    return {
        restrict: 'A',
        require: '^^superTipster',
        scope: {},
        link: function (scope, element, attrs, ctrl) {

            // Detect click
            element.on('click', function (e) {

                e.preventDefault();
                ctrl.popupTipster();
            });
        }
    }
});
