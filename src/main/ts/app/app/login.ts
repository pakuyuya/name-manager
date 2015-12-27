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
            })
            .then (
                // HTTP成功
                function(response) {
                    if(response.data.result) {
                        $(location).attr('href', 'main');
                    } else {
                        $scope.error = 'login failed.';
                    }
                    return false;
                },
                // HTTP失敗 or 拒否
                function (response) {
                    systemUI.systemErr();
                }
            )
        }
    }]);
}