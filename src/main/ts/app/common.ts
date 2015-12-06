/// <reference path="../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="./dialog.ts" />

import dialog = require('./dialog');

/**
 * @method システムエラー。
 * @param {String} 表示するテキスト。省略可能。
 */
export function systemErr( text? : string ){
    dialog.Dialog.show({ text: text || 'System error!'});
}