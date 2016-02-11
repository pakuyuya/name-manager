/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'
import {NamesResource, NamesResourceClass} from "../resources/namesResource";
import {NamesCountResource, NamesCountResourceClass} from "../resources/namesCountResource";
import {CheckedNameService} from './checkedNameService';

/**
 * 名簿一覧を取得するサービス
 */
export class NamesService {
    constructor(private NamesResource: NamesResourceClass, private NamesCountResource: NamesCountResourceClass, private CheckedName:CheckedNameService) {
    }
}

/**
 * NamseServiceの取得結果；
 */
export class NamesDto {
    constructor(
        public id: string,
        public checked: boolean,
        public memberLabel: string,
        public name: string,
        public expireAt: string
    ) {}
}

angular.module(appName).factory('Names',
    ['NamesResource', 'NamesCountResource', 'CheckedName',
        (NamesResource, NamesCountResource, CheckedName) =>
            new NamesService(NamesResource, NamesCountResource, CheckedName)]);
