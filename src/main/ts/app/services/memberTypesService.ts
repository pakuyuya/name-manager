/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

export class MemberTypesService {
    private defines = [
        { name:'役員', value:'1'},
        { name:'団体会員', value:'2'},
        { name:'賛助会員', value:'3'},
        { name:'購読会員', value:'4'}
    ];

    public getAll() {
        return this.defines;
    }
    public resolveName(id) {
        for (let memberType of this.defines) {
            if (id == memberType.value) {
                return memberType.name;
            }
        }
        return '';
    }
}

angular.module(appName).factory('MemberTypes', [() => {return new MemberTypesService}]);