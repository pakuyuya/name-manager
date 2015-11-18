/// <reference path="../lib/definitely/jquery/jquery.d.ts" />

/// <reference path="./dialog.ts" />

/**
 * @class Common
 * 共通業務処理
 */
module Common{
    /**
     * @method システムエラー。
     * @param {String} 表示するテキスト。省略可能。
     */
    export function systemErr( text? : string ){
        Dialog.show({ text: text || 'System error!'});
    }
}