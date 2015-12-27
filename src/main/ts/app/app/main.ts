/**
 * Created by yu on 2015/08/18.
 */

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />


import {appName} from '../constants';
import app = require('../initmodule');

import '../resources/index'
import '../services/index';
import '../directives/index';

app.controller('HeaderCtrl', ['$scope', function($scope){
}]);

app.controller('MainCtrl', ['memberTypes', function(memberTypes){
    // init models
    var self = this;
    self.selectedNum = 0;
    self.memberTypes = memberTypes.getAll();
}]);
