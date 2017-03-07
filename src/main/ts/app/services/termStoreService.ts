/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../d/extends.d.ts" />

import {appName} from '../constants'
import IQService = angular.IQService;

import {assign} from '../common/util'

export interface TermDto {
    name:   string;
    value:  string;
    prefix: string;
    suffix: string;
}

export class TermStoreService {
    private defines: Array<TermDto> = [
        { name:'なし',  value:'1', prefix:'', suffix:'' },
        { name:'様',    value:'2', prefix:'', suffix:'様' },
        { name:'御中',  value:'3', prefix:'', suffix:'御中' },
        { name:'Mr.',   value:'4', prefix:'Mr.', suffix:'' },
        { name:'Ms.',   value:'5', prefix:'Ms.', suffix:'' },
        { name:'Prof.', value:'6', prefix:'Prof.', suffix:'' },
    ];

    constructor(private $q: IQService) {
    }

    public getAll() : TermDto[] {
        return assign([], this.defines);
    }

    public get(value: string) : TermDto {
        return this.defines.find((define) => define.value === value);
    }
}

angular.module(appName).factory('TermStore', ['$q', ($q) => {return new TermStoreService($q)}]);