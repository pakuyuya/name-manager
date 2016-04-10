/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

export class TermsService {
    private defines = [
        { name:'なし', value:'1', prefix:'', suffix:'' },
        { name:'様', value:'2', prefix:'', suffix:'様' },
        { name:'御中', value:'3', prefix:'', suffix:'御中' },
        { name:'Mr.', value:'4', prefix:'Mr.', suffix:'' },
        { name:'Ms.', value:'5', prefix:'Ms.', suffix:'' },
        { name:'Prof.', value:'6', prefix:'Prof.', suffix:'' },
    ];

    public getAll() {
        return this.defines;
    }
    public resolveById(id) {
        for (let define of this.defines) {
            if (id == define.value) {
                return define;
            }
        }
        return null;
    }
}

angular.module(appName).factory('Terms', [() => {return new TermsService}]);