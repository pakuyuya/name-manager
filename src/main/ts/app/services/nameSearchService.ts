/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName, apiBaseUrl} from '../constants';
import {CheckedNameService} from './checkedNameService';
import {MemberTypeStoreService} from "./memberTypeStoreService";
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import IPromise = angular.IPromise;

/**
 * 名簿一覧を取得するサービス
 */
export class NameSearchService {
    constructor(private $http:IHttpService, private $q:IQService,
                 private checkedName:CheckedNameService, private memberTypeStore:MemberTypeStoreService) {
    }

    /**
     * 名簿一覧を取得する。
     * @param {any} query 検索クエリのObject
     * @returns {NameSearchDto[]}
     */
    public query(query: any): IPromise<NameSearchResult> {
        var self = this;
        var deferred = this.$q.defer();
        const url = `${apiBaseUrl}/namesearch`;

        this.$http.get(url, {params : query})
            .error((data) => { deferred.reject(data); })
            .success((json: any, status, headers, config) => {
                if (!json.result) {
                    throw new Error(`${url} don't responsed { result : true } at NameSearchService.query() `);
                }
                deferred.resolve(
                    {
                        datas : json.datas.map(
                            (value : any) =>
                                new NameSearchDto(
                                    value.id,
                                    self.checkedName.contains(value.id),
                                    this.memberTypeStore.get(value.id_membertype).name,
                                    value.name_e,
                                    value.name_j,
                                    value.member_expire_on
                                )
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

/**
 * NamseServiceの取得結果；
 */
export class NameSearchDto {
    constructor(
        public id: string,
        public checked: boolean,
        public membertype: string,
        public name_e: string,
        public name_j: string,
        public expire_on: string
    ) {}
}

/**
 * NamseServiceの取得結果；
 */
export class NameSearchResult {
    datas : Array<NameSearchDto>;
    idxfrom : number;
    idxto : number;
    total : number;
}

angular.module(appName).factory('NameSearch',
    ['$http', '$q', 'CheckedName', 'MemberTypeStore',
        ($http, $q, checkedName, memberTypeStore) =>
            new NameSearchService($http, $q, checkedName, memberTypeStore)]);
