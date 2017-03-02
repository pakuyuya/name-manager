/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

import IQService = angular.IQService;

import {assign} from '../common/util'

export interface ReceiptTypeDto {
    name  : string;
    value : string;
    none  : boolean;
    def   : boolean;
}

export class ReceiptTypeStoreService {
    constructor(private $q: IQService) {
        this.initStore();
    }

    public getAllAsync() : angular.IPromise<ReceiptTypeDto[]> {
        return queryPromise || this.$q((resolve, reject) => { resolve(assign({} as ReceiptTypeDto[], store)) });
    }

    public getAll() : ReceiptTypeDto[] {
        return assign({} as ReceiptTypeDto[], store);
    }

    public getExcludeNone() : ReceiptTypeDto[] {
        return store.filter((receiptType) => !receiptType.none);
    }

    public get(value: string) : ReceiptTypeDto {
        let model = store.find((define) => define.value === value);
        return model || null;
    }

    public getNone() : ReceiptTypeDto {
        return store.find((receiptType) => receiptType.none)
    }

    public getDefault() : ReceiptTypeDto {
        return store.find((receiptType) => receiptType.def)
    }

    public initStore() : angular.IPromise<ReceiptTypeDto[]> {
        if (isInitStore) {
            return this.$q((resolve, reject) => { resolve(store); });
        }
        if (queryPromise) {
            return queryPromise;
        }
        return this.refleshStore();
    }

    public refleshStore() : angular.IPromise<ReceiptTypeDto[]> {
        return queryPromise = this.$q((resolve, reject) => {
            store = [
                {name: 'なし', value: '0', none: true, def: false,},
                {name: '会費', value: '1', none: false, def: true,},
                {name: '購読', value: '2', none: false, def: false,},
            ];

            isInitStore = true;
            queryPromise = null;
            resolve(store);
        });
    }
}

let queryPromise: angular.IPromise<ReceiptTypeDto[]> = null;
let store : ReceiptTypeDto[] = [];
let isInitStore : boolean = false;

angular.module(appName).factory('ReceiptTypeStore', ['$q', ($q) => {return new ReceiptTypeStoreService($q)}]);