// common.js
//  create: 2015/05/09 by yu

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../dialog.ts" />
/// <reference path="../tips.ts" />
/// <reference path="../common.ts" />

/**
 * /login 用JS定義
 */
module Login {
	var loginApp = angular.module('loginApp', []);
    loginApp.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.sendLogin = function() {
            return $http({
                url    : 'ajax/login',
                method : 'POST',
            })
            .then (
                // HTTP成功
                function(response) {
                    console.log(response);
                    if(response.data.result) {
                        $(location).attr('href', 'main');
                    } else {
                        $scope.error = 'login failed.';
                    }
                    return false;
                },
                // HTTP失敗 or 拒否
                function (response) {
                    Common.systemErr();
                }
            )
        }
    }]);
}