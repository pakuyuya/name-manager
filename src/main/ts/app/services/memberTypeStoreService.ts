/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

import IQService = angular.IQService;

import {assign} from '../common/util'

export interface MemberTypeDto {
    name  : string;
    value : string;
    none  : boolean;
    def   : boolean;
    receiptTypeValue: string;
}

export class MemberTypeStoreService {
    constructor(private $q: IQService) {
        this.initStore();
    }

    public getAllAsync() : angular.IPromise<MemberTypeDto[]> {
        return queryPromise || this.$q((resolve, reject) => { resolve(assign({} as MemberTypeDto[], store)) });
    }

    public getAll() : MemberTypeDto[] {
        return assign({} as MemberTypeDto[], store);
    }

    public getExcludeNone() : MemberTypeDto[] {
        return store.filter((memberType) => !memberType.none);
    }

    public get(value: string) : MemberTypeDto {
        let model = store.find((define) => define.value === value);
        return model || null;
    }

    public getNone() : MemberTypeDto {
        return store.find((memberType) => memberType.none)
    }

    public getDefault() : MemberTypeDto {
        return store.find((memberType) => memberType.def)
    }

    public initStore() : angular.IPromise<MemberTypeDto[]> {
        if (isInitStore) {
            return this.$q((resolve, reject) => { resolve(store); });
        }
        if (queryPromise) {
            return queryPromise;
        }
        return this.refleshStore();
    }

    public refleshStore() : angular.IPromise<MemberTypeDto[]> {
        return queryPromise = this.$q((resolve, reject) => {
            store = [
                {name: 'なし', value: '0', none: true, def: false, receiptTypeValue: '0',},
                {name: '個人会員', value: '1', none: false, def: true, receiptTypeValue: '1',},
                {name: '団体会員', value: '2', none: false, def: false, receiptTypeValue: '1',},
                {name: '賛助会員', value: '3', none: false, def: false, receiptTypeValue: '1',},
                {name: '購読', value: '4', none: false, def: false, receiptTypeValue: '0',},
            ];

            isInitStore = true;
            queryPromise = null;
            resolve(store);
        });
    }
}

let queryPromise: angular.IPromise<MemberTypeDto[]> = null;
let store : MemberTypeDto[] = [];
let isInitStore : boolean = false;

angular.module(appName).factory('MemberTypeStore', ['$q', ($q) => {return new MemberTypeStoreService($q)}]);