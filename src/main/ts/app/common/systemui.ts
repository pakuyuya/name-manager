/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="./dialog.ts" />

import {Dialog} from './dialog';

/**
 * @method システムエラー。
 * @param {String} 表示するテキスト。省略可能。
 */
export function systemErr( text? : string ){
    Dialog.show({ text: text || 'System error!'});
}