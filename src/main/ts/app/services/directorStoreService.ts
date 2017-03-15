/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../d/extends.d.ts" />

import {appName} from '../constants'
import IQService = angular.IQService;

import {assign} from '../common/util'

export interface DirectorDto {
    name:   string;
    value:  string;
    none:   boolean;
}

export class DirectorStoreService {
    private defines: Array<DirectorDto> = [
        { name:'なし',  value:'0', none: true, },
        { name:'理事',    value:'1', none: false, },
        { name:'評議員',  value:'2', none: false, },
        { name:'監事',   value:'3', none: false, },
        { name:'事業評価委員',   value:'4', none: false, },
    ];

    constructor(private $q: IQService) {
    }

    public getAll() : DirectorDto[] {
        return assign([], this.defines);
    }

    public get(value: string) : DirectorDto {
        return this.defines.find((define) => define.value === value);
    }

    public none() : DirectorDto {
        return this.defines[0];
    }
}

angular.module(appName).factory('DirectorStoreService', ['$q', ($q) => {return new DirectorStoreService($q)}]);