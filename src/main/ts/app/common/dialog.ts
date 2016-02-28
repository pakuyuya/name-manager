/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />

import {ZIndexer} from './z-indexer'
import {minDlgZIndex} from '../constants'

export module Dialog{
    /**
     * ダイアログを呼び出す。
     *
     * @param options
     */
    export function show(options : any){
        // オプション作成
        options = $.extend({
            caption : 'Message',
            text : '', // text
            cssClass : false,
            callback : {},
            buttons : { ok : 'OK' },
            focusedButton : 'ok',
        }, options || {});

        var $dialog : JQuery = createDialog(options);
        var $filter : JQuery = createFilter();
        setDlgOnDOM($dialog, $filter);
    }

    /**
     * DialogのDOMを生成し返す
     *
     * @param options
     * @returns jQuery
     */
    function createDialog(options : any) : JQuery
    {
        var $dialog =
            $('<div>').addClass('c-dialog');

        // テキスト
        var $dlgText = $('<div>').addClass('c-dialog-text')
                                    .html(options.text);

        var $dlgButtons = $('<div>').addClass('c-dialog-buttons');
        var callbacks : any = options.callback;

        var buttons = options.buttons;

        // パラメタをもとに、ボタンを生成して返すクロージャ
        var fnCreateButton = function(key, param){
            var id = key;
            var text = 'ok';
            var typeParam = typeof(param);
            var cssClass;
            switch(typeParam){
                case 'string':
                    text = param;
                    break;
                case 'object':
                    text = param.text;
                    cssClass = param.cssClass;
                    break;
            }

            var $ret = $('<button>')
                .addClass('c-dialog-button')
                .addClass('c-button-' + key)
                .text(text)
                .click(function(){
                    if($.isFunction(callbacks)){
                        callbacks(id);
                    }
                    closeAll();
                });
            if(cssClass){
                $ret.addClass(cssClass);
            }

            return $ret;
        };

        // ボタン生成

        if(typeof(buttons) !== 'object'){
            // objectじゃない場合（多分プリミティブ）な場合はパラメータ型に変換。
            buttons = { ok : buttons };
        }

        if($.isArray(buttons)){
            for(var i=0,len=buttons.length; i<len; ++i){
                $dlgButtons.append(fnCreateButton(i, buttons[i]));
            }
        }else{
            for(var k in buttons){
                $dlgButtons.append(fnCreateButton(k, buttons[k]));
            }
        }

        // DOM追加
        $dialog.append($dlgText, $dlgButtons);

        // focus
        if(options.focusedButton){
            $('.c-button-' + options.focusedButton, $dialog).focus();
        }

        return $dialog;
    }

    /**
     * 背面フィルターを作り、返す
     *
     * @returns JQuery  filter
     */
    function createFilter(){
        return $('<div>').addClass('c-dialog-filter');
    }

    function setDlgOnDOM($dialog : JQuery, $filter : JQuery){

        $filter.css('z-index', ZIndexer.next(minDlgZIndex).toString());
        $dialog.css('z-index', ZIndexer.next(minDlgZIndex).toString());

        //フィルターサイズ設定
        var $wnd = $(window);

        var fnResizeDlgs = function(){
            var wnd_w = $wnd.width();
            var wnd_h = $wnd.height();

            var wnd_scr_top = $wnd.scrollTop();
            var wnd_scr_lft = $wnd.scrollLeft();

            $filter.width(wnd_w);
            $filter.height(wnd_h);

            $dialog.offset({
                top : wnd_scr_top + wnd_h/2 - $dialog.height(),
                left: wnd_scr_lft + wnd_w/2 - $dialog.width()/2,
            });
            $filter.offset({top : wnd_scr_top, left : wnd_scr_lft});
        };

        var fnResizeWnd = function(){
            $dialog.addClass('u-no-transition');
            $filter.addClass('u-no-transition');

            fnResizeDlgs();

            setTimeout(function(){
                $dialog.removeClass('u-no-transition');
                $filter.removeClass('u-no-transition');
            }, 0);
        };

        // windowにリサイズイベント追加
        $wnd.bind('resize', fnResizeWnd);

        // 閉じる関数追加
        removeFunctionList.push(function(){
            $dialog.addClass('is-rehide');
            $filter.addClass('is-rehide');

            setTimeout(function(){
                $dialog.remove();
                $filter.remove();
            },250);
            $wnd.unbind('resize', fnResizeWnd);
        });

        // DOM追加
        $('body').append($dialog, $filter);

        // リサイズ
        fnResizeDlgs();

        // 表示
        $dialog.addClass('is-shown');
        $filter.addClass('is-shown');
    }

    var removeFunctionList : any = [];

    export function closeAll(){
        for(var i=0, len=removeFunctionList.length; i<len; ++i){
            removeFunctionList[i]();
        }
        removeFunctionList = [];
    }
}