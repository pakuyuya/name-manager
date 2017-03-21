/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="./dialog.ts" />

import {Dialog} from './dialog';

/**
 * @method システムエラー。
 * @param {String} 表示するテキスト。省略可能。
 */
export function systemErr( text? : string ){
    Dialog.show({ text: text || 'A system error occurred! Please contact the system administrator.', fixed: false,});
}

/**
 * フォームの検証メッセージを呼び出します。非同期に行われます。
 *
 * @param form
 */
export function popFormErrorsAsync(form: Element) {
    let $btn = $(document.createElement('button'))
                    .css('display', 'none')
                    .click((ev) => {});

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


const defaultErrorMessages = {
    valueMissing : '必須項目です',
    badInput : '入力値が不正です',
    typeMismatch : '入力値が不正です',
    patternMismatch : '入力フォーマットが不正です',
    tooLong : '文字が長すぎます',
    tooShort : '文字が短すぎます',
    rangeUnderflow : '入力値が小さすぎます',
    rangeOverflow : '入力値が大きすぎます',
    stepMismatch : '入力値が不正です',
};
const validTargets = [
    'valueMissing',
    'badInput',
    'typeMismatch',
    'patternMismatch',
    'tooLong',
    'tooShort',
    'rangeUnderflow',
    'rangeOverflow',
    'stepMismatch',
];

/**
* コントロール要素に設定されたValidatorAPIを参照して、
* カスタムされた検証メッセージを取得します。
*
* @param element 対象の要素
* @param errorMessages エラーメッセージの一覧。
* @param errorMessages.valueMissing
* @param errorMessages.typeMismatch
* @param errorMessages.patternMismatch
* @param errorMessages.tooLong
* @param errorMessages.tooShort
* @param errorMessages.rangeUnderflow
* @param errorMessages.rangeOverflow
* @param errorMessages.stepMismatch
* @param errorMessages.badInput
*
* @returns {string} 戻り値
*/
export function getErrorMessage(element : any, errorMessages? : any) {
    errorMessages = errorMessages || {};
    if (element.willValidate && !element.validity.valid) {
        for (const validTarget of validTargets) {
            if (element.validity[validTarget]) {
                return element.getAttribute('title')
                    || errorMessages[validTarget] || defaultErrorMessages[validTarget];
            }
        }
    }
    return '';
}