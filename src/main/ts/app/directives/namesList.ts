/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import appConsts = require('../constants');

class NamesListDirective {
    restrict = 'CA';
    priority = 0;
    transclude = true;
    replace = true;
    scope = {
        show : '=',
    };
    controller = ['$scope', function($scope){
        var self = this;

        self.datas = [];
        self.query = {};
    }];
};

var app = angular.module(appConsts.appName, ['checklist-model']);
app.directive('namesList', function() { return new NamesListDirective() });
