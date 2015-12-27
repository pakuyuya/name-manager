/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

class MemberTypesService {
    public getAll() {
        return [
            { name:'役員', value:'off'},
            { name:'団体会員', value:'ord'},
            { name:'賛助会員', value:'sup'},
            { name:'購読会員', value:'sub'}
        ];
    }
}

var app = angular.module(appName).factory('memberTypes', [() => {return new MemberTypesService}]);