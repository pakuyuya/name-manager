/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants';

export class NamesListDirective {
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

var app = angular.module(appName).directive('namesList', () => { return new NamesListDirective() } );