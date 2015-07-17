// common.js
//  create: 2015/05/09 by yu

/// <reference path="../lib/definitely/jquery/jquery.d.ts" />

/// <reference path="./dialog.ts" />

module Common{
    /**
     * show system error dialog.
     * @param text optional. error message.
     */
    export function systemErr( text? : string ){
        Dialog.show({ text: text || 'System error!'});
    }

    /**
     * transfer log to the server.
     * @param text logging text.
     * @param params optional. logging with parameter.
     */
    export function transferLog( text: string, params?: any){
        var data : any = {
            text : text,
        };

        if(params){
            data.params = JSON.stringify(params);
        }

        $.post('ajax/log', data);
    }
}