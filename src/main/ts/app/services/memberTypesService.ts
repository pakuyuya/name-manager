/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

export class MemberTypesService {
    public getAll() {
        return [
            { name:'役員', value:'off'},
            { name:'団体会員', value:'ord'},
            { name:'賛助会員', value:'sup'},
            { name:'購読会員', value:'sub'}
        ];
    }
}

angular.module(appName).factory('MemberTypes', [() => {return new MemberTypesService}]);