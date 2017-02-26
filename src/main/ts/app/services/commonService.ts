/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'
import {assign} from '../common/util'

/**
 * ユーティリティクラス
 */
export class CommonService {
    constructor(private $q:angular.IQService) {
    }

    public noopResource<T>() : angular.resource.IResource<T> {
        let promise = this.$q((resolve) => resolve(null));
        let extend = {
            $save : this.null$q(),
            $update : this.null$q(),
            $remove : this.null$q(),
        };

        return assign(promise, extend) as any;
    }

    private null$q() { return () => this.$q((resolve) => resolve(null)); }
}

angular.module(appName).factory('Common', [ '$q', ($q) => {return new CommonService($q); }]);