
/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName, apiBaseUrl} from '../constants';
import {CheckedNameService} from './checkedNameService';
import {MemberTypeStoreService} from "./memberTypeStoreService";
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import IPromise = angular.IPromise;

import * as U from '../common/util';

/**
 * 名簿情報を登録・更新するサービス
 */
export class NameRepositoryService {
    constructor(private $http:IHttpService, private $q:IQService) {
    }

    /**
     * 名簿情報を登録する。
     * @param {any} model 登録するデータ
     * @returns {any} 結果
     */
    public save(model: any): IPromise<any> {
        var deferred = this.$q.defer();
        const url = `${apiBaseUrl}/nameAdd`;

        this.$http({
                method : 'POST',
                url : url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                transformRequest: (data) => $.param(data),
                data : U.jsonizeModelDeep(model)
            })
            .error((data, status, headers, config) => { deferred.reject({status: status, config : config}); })
            .success((json: NameAddResult, status, headers, config) => {
                if (!json.result) {
                    deferred.reject(`${url} don't responsed { result : true } at NameRepositoryService.save() `);
                    return;
                }
                deferred.resolve(json.data);
            });

        return deferred.promise;
    }

    /**
     * 名簿情報を更新する。
     * @param {any} model 更新するデータ
     * @returns {any} 結果
     */
    public update(model: any): IPromise<any> {
        var deferred = this.$q.defer();
        const url = `${apiBaseUrl}/nameUpdate`;

        this.$http({
                method : 'POST',
                url : url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                transformRequest: (data) => $.param(data),
                data : U.jsonizeModelDeep(model)
            })
            .error((data, status, headers, config) => { deferred.reject({status: status, config : config}); })
            .success(function(json: NameUpdateResult, status, headers, config){
                if (!json.result) {
                    throw new Error(`${url} don't responsed { result : true } at NameRepositoryService.update() `);
                }
                deferred.resolve(json.data);
            });

        return deferred.promise;
    }
}

/**
 * nameAddの結果
 */
class NameAddResult {
    constructor(
        public result: boolean,
        public errors: string[],
        public data: {
            id: number,
        },
    ) {}
}

/**
 * NamseServiceの取得結果；
 */
class NameUpdateResult {
    constructor(
        public result: boolean,
        public errors: string[],
        public data: {
            id: number,
        },
    ) {}
}



angular.module(appName).factory('NameRepository',
    ['$http', '$q',
        ($http, $q) =>
            new NameRepositoryService($http, $q)]);
