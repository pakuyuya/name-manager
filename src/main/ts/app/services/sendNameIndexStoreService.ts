/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

import IQService = angular.IQService;

import {assign} from '../common/util'

export interface SendNameIndexDto {
    column : string;
    value  : string;
}

export class SendNameIndexStoreService {
    constructor(private $q: IQService) {
        this.initStore();
    }

    public getAllAsync() : angular.IPromise<SendNameIndexDto[]> {
        return queryPromise || this.$q((resolve, reject) => { resolve(assign({} as SendNameIndexDto[], store)) });
    }

    public getAll() : SendNameIndexDto[] {
        return assign({} as SendNameIndexDto[], store);
    }

    public get(value: string) : SendNameIndexDto {
        let model = store.find((define) => define.value === value);
        return model || null;
    }

    public initStore() : angular.IPromise<SendNameIndexDto[]> {
        if (isInitStore) {
            return this.$q((resolve, reject) => { resolve(store); });
        }
        if (queryPromise) {
            return queryPromise;
        }
        return this.refleshStore();
    }

    public refleshStore() : angular.IPromise<SendNameIndexDto[]> {
        return queryPromise = this.$q((resolve, reject) => {
            store = [
                { value: 'e', column : 'name_e', },
                { value: 'j', column : 'name_j', },
                { value: 'k', column : 'name_k', },
            ];

            isInitStore = true;
            queryPromise = null;
            resolve(store);
        });
    }
}

let queryPromise: angular.IPromise<SendNameIndexDto[]> = null;
let store : SendNameIndexDto[] = [];
let isInitStore : boolean = false;

angular.module(appName).factory('SendNameIndexStore', ['$q', ($q) => {return new SendNameIndexStoreService($q)}]);