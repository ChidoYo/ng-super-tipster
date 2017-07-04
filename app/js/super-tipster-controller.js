// Module Tipster
angular.module('tipster', [])

angular.module('tipster').controller('tipsperController', ['$scope', function ($scope) {

    $scope.title = 'Angular Super Tipster';

    $scope.decades = {
        seventies: true,
        eighties: false,
        nineties: false
    }

    $scope.selectDecade = function () {
        // console.log('select');
        // $scope.decades.nineties = true;
        // $scope.$apply();
    }
}]);
