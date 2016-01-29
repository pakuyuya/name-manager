/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

/**
 * チェックした名簿のIDを保持するサービス<br>
 * 実態はSetの実装。
 */
export class ClipSetService {
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
        if (!ClipSetService.idset[id]) {
            ClipSetService.idset[id] = true;
            ClipSetService.len++;
        }
    }

    /**
     * 名簿IDのチェックを外す
     * @param id
     */
    public unclip(id: string) {
        if (ClipSetService.idset[id]) {
            delete ClipSetService.idset[id];
            ClipSetService.len--;
        }
    }

    /**
     * クリップを全て消去する
     */
    public clear() {
        ClipSetService.idset = {};
        ClipSetService.len   = 0;
    }

    /**
     * 保持するIDすべてを連想配列で取得する
     * @returns {Object} IDがindexとなる連想配列
     */
    public getIdset() : Object {
        return  ClipSetService.idset;
    }

    /**
     * 保持するIDすべてを整数添字の配列で取得する
     * @returns {Array} IDを値に持つ配列
     */
    public getIds() : Array<string> {
        var ids = [];
        for (let id in ClipSetService.idset) {
            ids.push(id);
        }
        return ids;
    }

    /**
     * 現在のIDの個数を取得する
     * @returns {number} 個数
     */
    public length() : number {
        return ClipSetService.len;
    }

    /**
     * 指定したIDが含まれているか
     * @param id
     * @returns {boolean}
     */
    public contains(id: string) : boolean {
        return !!ClipSetService.idset[id];
    }
}

angular.module(appName).factory('ClipSet', [() => {return new ClipSetService}]);