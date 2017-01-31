/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName, apiBaseUrl} from '../constants';
import {CheckedNameService} from './checkedNameService';
import {MemberTypeService} from "./memberTypeService";
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import IPromise = angular.IPromise;

/**
 * 名簿一覧を取得するサービス
 */
export class NameSearchService {
    constructor(private $http:IHttpService, private $q:IQService,
                 private CheckedName:CheckedNameService, private MemberTypes:MemberTypeService) {
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
            .success(function(json: any, status, headers, config){
                if (!json.result) {
                    throw new Error(`${url} don't responsed { result : true } at NameSearchService.query() `);
                }
                deferred.resolve(
                    {
                        datas : json.datas.map(
                            (value : any) =>
                                new NameSearchDto(
                                    value.id,
                                    self.CheckedName.contains(value.id),
                                    value.membertype,
                                    value.entry_name_e,
                                    value.entry_name_j,
                                    value.send_expire_on
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
        public memberLabel: string,
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
    ['$http', '$q', 'CheckedName', 'MemberTypes',
        ($http, $q, CheckedName, MemberTypes) =>
            new NameSearchService($http, $q, CheckedName, MemberTypes)]);
