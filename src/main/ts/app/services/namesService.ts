/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'
import {NamesResource, NamesResourceClass} from "../resources/namesResource";
import {NamesCountResource, NamesCountResourceClass} from "../resources/namesCountResource";
import {ClipSetService} from './clipSetService';

/**
 * 名簿一覧を取得するサービス
 */
export class NamesService {
    constructor(private NamesResource: NamesResourceClass, private NamesCountResource: NamesCountResourceClass, private ClipSet:ClipSetService) {
    }

    /**
     * 名簿一覧を取得する。
     * @param {any} query 検索クエリのObject
     * @returns {NamesDto[]}
     */
    public query(query: any):Array<NamesDto> {
        let names = this.NamesResource.query(query);
        return names.map(
            (value:NamesResource) =>
                new NamesDto(
                    value.id,
                    this.ClipSet.contains(value.id),
                    value.memberLabel,
                    value.name,
                    value.expiredAt
                )
        );
    }

    /**
     *
     */
    public getCount(query: any) : number {
        return this.NamesCountResource.get(query).count;
    }
}

/**
 * NamseServiceの取得結果；
 */
export class NamesDto {
    constructor(
        public id: string,
        public cliped: boolean,
        public memberLabel: string,
        public name: string,
        public expireAt: string
    ) {}
}

angular.module(appName).factory('Names',
    ['NamesResource', 'NamesCountResource', 'ClipSet',
        (NamesResource, NamesCountResource, ClipSet) =>
            new NamesService(NamesResource, NamesCountResource, ClipSet)]);
