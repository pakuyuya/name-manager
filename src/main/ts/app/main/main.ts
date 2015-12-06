/**
 * Created by yu on 2015/08/18.
 */

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import appConsts = require('setting/constants');

var mainApp = angular.module(appConsts.appName);

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

mainApp.controller('HeaderCtrl', ['$scope', '$http', function($scope){

}]);

mainApp.controller('MainCtrl', [ 'memberTypes',  function( memberTypes){
    // init models
    var self = this;
    self.selectedNum = 0;
    self.memberTypes = memberTypes.getAll();
}]);
