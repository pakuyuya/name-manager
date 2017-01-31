/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="./dialog.ts" />

import {Dialog} from './dialog';

/**
 * @method システムエラー。
 * @param {String} 表示するテキスト。省略可能。
 */
export function systemErr( text? : string ){
    Dialog.show({ text: text || 'A system error occurred! Please contact the system administrator.'});
}

/**
 * フォームの検証メッセージを呼び出します。非同期に行われます。
 *
 * @param form
 */
export function popFormErrorsAsync(form: Element) {
    let $btn = $(document.createElement('button'))
                    .css('display', 'none')
                    .click((ev) => {
                        console.log(ev);
                    });

    const onsubmit = (event) => {
        event.preventDefault();
    };

    form.addEventListener('submit', onsubmit);

    $(form).append($btn);
    setTimeout(() => {
        $btn.click();
        setTimeout(() => {
            form.removeEventListener('submit', onsubmit);
            $btn.remove();
        });
    }, 0);
}