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

import {MemberTypesService} from '../services/memberTypesService';

app.controller('HeaderCtrl', ['$scope', function($scope){
}]);


class MainController {
    constructor(private MemberTypes: MemberTypesService) {
        this.memberTypes = this.MemberTypes.getAll();
    }
    public selectedNum = 0;
    public memberTypes = [];
}

app.controller('MainCtrl', ['MemberTypes', MainController]);