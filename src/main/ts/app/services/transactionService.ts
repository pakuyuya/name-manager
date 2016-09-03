/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName, apiBaseUrl} from '../constants'
import { assign } from '../common/util';
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IHttpPromise = angular.IHttpPromise;
import IPromise = angular.IPromise;

/**
 * Transactionサービス
 */
export class TransactionService {
    constructor(private $http:IHttpService, private $q:IQService) {
    }

    /**
     * トランザクションを開始します。
     *
     */
    public start(param?:TransactionStartParam) : IPromise<string> {
        const url = `${apiBaseUrl}/transaction/start`;
        let data = param || {};

        return this.$http.get<string>(url, data).success((response) => {
            let json = <any>response;
            return this.$q(() => { return <string>json.tranid; });
        });
    }

    public parallelRequest(tranid :string, ...reqs: RequestSetting[]) : IPromise<Array<any>> {
        return this.parallelRequestAry(tranid, reqs);
    }

    public parallelRequestAry(tranid :string, reqs: RequestSetting[]) : IPromise<Array<any>> {
        let promises : Array<IPromise<any>> = reqs.map((requestSetting, i) => {
            const method = requestSetting.method || 'PUT';
            const url = requestSetting.url;
            const data = assign({tranid : tranid, transeq : i}, requestSetting.data);

            return this.$http({method:method, url:url, data:data});
        });

        return this.$q.all(promises);
    }

    public commit(tranid : string) : IPromise<any> {
        const url = `${apiBaseUrl}/transaction/commit`;
        return this.$http.get(url);
    }

    public rollback(tranid : string) : IPromise<any> {
        const url = `${apiBaseUrl}/transaction/rollback`;
        return this.$http.get<string>(url);
    }

    public transaction(...reqs: RequestSetting[]) {
        let tranid:string = null;
        let results = null;
        this
            .start()
            .then(
                (gotTranid : string) => {
                    tranid = gotTranid;
                    return this.parallelRequestAry(tranid, reqs);
                } ,
                (result) => {
                    console.error(result);
                    throw 'transaction aborted';
                }
            )
            .then((promiseResults) => {
                results = promiseResults;
                return this.commit(tranid);
            } ,
            (result) => {
                console.error(result);
                throw 'transaction aborted';
            })
            .then(
                () => { return this.$q(() => results) },
                (result) => {
                    console.error(result);
                    throw 'transaction aborted';
                }
            )
            .catch((reason) => {
                console.error(reason);
                if (tranid) {
                    this.rollback(tranid);
                }
                throw reason;
            });
    }
}

export interface TransactionStartParam {
    num : number;
}

export interface RequestSetting {
    url : string;
    data?: any;
    method?: string;
}


angular.module(appName).factory('Transaction',  ['$http', '$q', ($http, $q) => { return new TransactionService($http, $q) }]);