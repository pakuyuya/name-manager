/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

import IQService = angular.IQService;

export interface MemberTypeDto {
    name: string;
    value: string;
}

export class MemberTypeService {
    private defines: Array<MemberTypeDto> = [
        { name:'役員', value:'1' },
        { name:'団体会員', value:'2' },
        { name:'賛助会員', value:'3' },
        { name:'購読会員', value:'4' },
        { name:'大口配布', value:'5' },
        { name:'府市配布', value:'6' },
        { name:'寄贈配布', value:'7' },
    ];

    constructor(private $q: IQService) {
    }

    public query() : angular.IPromise<Array<MemberTypeDto>> {
        return this.$q((resolve, reject) => resolve(this.defines));
    }

    public get(value: string) : angular.IPromise<MemberTypeDto> {
        return this.$q((resolve, reject) => {
            let model = this.defines.find((define) => define.value === value);
            resolve(model ? model : null);
        });
    }
}

angular.module(appName).factory('MemberTypes', ['$q', ($q) => {return new MemberTypeService($q)}]);