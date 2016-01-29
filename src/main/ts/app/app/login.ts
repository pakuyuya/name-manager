// common.js
//  create: 2015/05/09 by yu

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />

import systemUI = require('../common/systemui');
import {appName} from '../constants';


/**
 * /login 用JS定義
 */
module Login {
    var loginApp = angular.module(appName, []);
    loginApp.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.sendLogin = function() {
            return $http({
                url    : 'ajax/login',
                method : 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                transformRequest: $.param,
                data: {
                    loginid : $scope.loginid,
                    loginpw : $scope.loginpw,
                }
            })
            .then (
                // HTTP成功
                function(response) {
                    if (response.data.error) {
                        systemUI.systemErr();
                    } else {
                        if (response.data.result) {
                            $(location).attr('href', 'main');
                        } else {
                            $scope.error = 'Incorrect username or password.';
                        }
                    }
                    return false;
                },
                // HTTP失敗 or 拒否
                function (response) {
                    systemUI.systemErr();
                }
            )
        }
        $scope.clearError = function() {
            $scope.error = false;
        }
    }]);
}