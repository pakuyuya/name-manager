/**
 * Created by yu on 2015/08/18.
 */

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />


var mainApp = angular.module('mainApp', []);

// ui Gmenu
mainApp.directive('uiGmenu', function(){
    return {
        restrict: 'CA',
        priority: 0,
        transclude: true,
        replace: true,
        templateUrl: 'html/main/gmenu.html',
        score: {
            show : '=',
        },
        controller: ['$scope', function($scope){
            $scope.show = false;
            $scope.toggle = function(){
                $scope.show = !$scope.show;
            };
        }]
    };
});

mainApp.controller('header', ['$scope', '$http', function($scope, $http){
    // init models
    $scope.memberTypes = [];
}]);