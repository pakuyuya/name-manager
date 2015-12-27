/**
 * Created by yu on 2015/05/28.
 */

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
export module Message{

    var MSGS = {
        ja : {
            SEARCH_BUTTON_TEXT : '',
        },
        en :{

        },
    };

    export function setLanguage(lang : string){
        if(!MSGS[lang]){
            return;
        }

        setMessageToDOM(MSGS[lang]);
    }

    function setMessageToDOM(messages : any){
        for(var k in messages){
            $('#msg-' + k).text(messages[k]);
        }
    }
}