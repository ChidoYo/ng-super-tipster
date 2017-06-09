'use strict';

// Module Tipster
var tipster = angular.module('tipster', []);

tipster.controller('tipsperController', function ($scope) {

    $scope.title = 'Angular Super Tipster';
})


// Directives
tipster.directive('superTipster', function () {

    return {
        restrict: 'E',
        scope: {},
        // trasclude: {
        //     'tipster-popup': 'tipster-popup'
        // },
        controller: function ($scope) {

            this.openedTipster = false;

            this.toggleTipster = function () {
                console.log('toggleTipster', $scope);
                $scope.openedTipster = !$scope.openedTipster;
            }
        },
        controllerAs: 'super'
    }
})

tipster.directive('tipsterTrigger', function () {

    return {
        restrict: 'A',
        require: '^^superTipster',
        scope: {},
        link: function (scope, element, attrs, ctrl) {

            // Detect click
            element.on('click', function (e) {
                // ctrl.toggleTipster();
                console.log('toggle', element.siblings().find('.super-tipster'));
                element.siblings().find('.super-tipster').toggle();
            })
        }
    }
})

// tipster.directive('tipsterPopup', function () {
//
//     return {
//         restrict: 'E',
//         require: '^^superTipster',
//         scope: {},
//         link: function (scope, element, attrs, ctrl) {
//
//             scope.tipsterOpen = ctrl.openedTipster;
//
//             console.log('scope', scope);
//
//             scope.$watch('scope.tipsterOpen', function () {
//                 console.log('loaded?');
//                 if (scope.tipsterOpen) {
//                     console.log('open');
//                 } else {
//                     console.log('closed');
//                 }
//             });
//
//         }
//     }
// })
