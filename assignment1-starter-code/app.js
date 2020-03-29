
(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    // $scope.name ='list comma separated dishes you usually have for lunch'
    // $scope.js_placeholder ='hello list comma separated dishes you usually have for lunch'
    $scope.name = '';
    $scope.hintMessage = '';
    $scope.checkClick = function (){
        if ($scope.name == ''){
            $scope.hintMessage = 'Please enter data first';
        }else if($scope.name.split(',').length<4){
            $scope.hintMessage = 'Enjoy!';
        }else{
            $scope.hintMessage = 'To much!';
        }
    };
}

})();