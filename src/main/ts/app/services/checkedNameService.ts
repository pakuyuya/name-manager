/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

/**
 * チェックした名簿のIDを保持するサービス<br>
 * 実態はSetの実装。
 */
export class CheckedNameService {
    static idset: Object;
    static len: number;

    constructor() {
        this.clear();
    }

    /**
     * 名簿IDを記憶する
     * @param id
     */
    public clip(id: string) {
        if (!CheckedNameService.idset[id]) {
            CheckedNameService.idset[id] = true;
            CheckedNameService.len++;
        }
    }

    /**
     * 名簿IDのチェックを外す
     * @param id
     */
    public unclip(id: string) {
        if (CheckedNameService.idset[id]) {
            delete CheckedNameService.idset[id];
            CheckedNameService.len--;
        }
    }

    /**
     * クリップを全て消去する
     */
    public clear() {
        CheckedNameService.idset = {};
        CheckedNameService.len   = 0;
    }

    /**
     * 保持するIDすべてを連想配列で取得する
     * @returns {Object} IDがindexとなる連想配列
     */
    public getIdset() : Object {
        return  CheckedNameService.idset;
    }

    /**
     * 保持するIDすべてを整数添字の配列で取得する
     * @returns {Array} IDを値に持つ配列
     */
    public getIds() : Array<string> {
        var ids = [];
        for (let id in CheckedNameService.idset) {
            ids.push(id);
        }
        return ids;
    }

    /**
     * 現在のIDの個数を取得する
     * @returns {number} 個数
     */
    public getLength() : number {
        return CheckedNameService.len;
    }

    /**
     * 指定したIDが含まれているか
     * @param id
     * @returns {boolean}
     */
    public contains(id: string) : boolean {
        return !!CheckedNameService.idset[id];
    }
}

angular.module(appName).factory('CheckedName', [() => {return new CheckedNameService(); }]);