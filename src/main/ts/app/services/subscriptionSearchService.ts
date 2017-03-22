/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName, apiBaseUrl} from '../constants';
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import IPromise = angular.IPromise;

import {SubscriptionResource, SubscriptionResourceClass} from '../resources/subscriptionResource';


/**
 * 名簿一覧を取得するサービス
 */
export class SubscriptionSearchService {
    constructor(private $http:IHttpService, private $q:IQService, private subscriptionResource:SubscriptionResourceClass) {
    }

    /**
     * 名簿一覧を取得する。
     * @param {any} query 検索クエリのObject
     * @returns {SubscriptionSearchDto[]}
     */
    public query(query: any): IPromise<SubscriptionSearchResult> {
        var deferred = this.$q.defer();
        const url = `${apiBaseUrl}/subscriptionsearch`;

        this.$http.get(url, {params : query})
            .error((data) => { deferred.reject(data); })
            .success((json: any, status, headers, config) => {
                if (!json.result) {
                    throw new Error(`${url} don't responsed { result : true } at SubscriptionSearchService.query() `);
                }
                deferred.resolve(
                    {
                        datas : json.datas.map(
                            (value : any) =>
                                new this.subscriptionResource(value)
                        ),
                        idxfrom : ~~(json.idxfrom),
                        idxto : ~~(json.idxto),
                        total : ~~(json.total),
                    }
                );
            });

        return deferred.promise;
    }
}
export interface SubscriptionSearchResult {
    datas  : SubscriptionResource[];
    idxfrom: number;
    idxto  : number;
    total  : number;
}

angular.module(appName).factory('SubscriptionSearch',
    ['$http', '$q', 'SubscriptionResource',
        ($http, $q, subscriptionResource) =>
            new SubscriptionSearchService($http, $q, subscriptionResource)]);
