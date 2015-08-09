/// <reference path="../lib/definitely/jquery/jquery.d.ts" />

module Dialog{
    /**
     * �_�C�A���O���Ăяo���B
     *
     * @param options
     */
    export function show(options : any){
        // �I�v�V�����쐬
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
     * Dialog��DOM�𐶐����Ԃ�
     *
     * @param options
     * @returns jQuery
     */
    function createDialog(options : any) : JQuery
    {
        var $dialog =
            $('<div>').addClass('c-dialog');

        // �e�L�X�g
        var $dlgText = $('<div>').addClass('c-dialog-text')
                                    .html(options.text);

        var $dlgButtons = $('<div>').addClass('c-dialog-buttons');
        var callbacks : any = options.callback;

        var buttons = options.buttons;

        // �p�����^�����ƂɁA�{�^���𐶐����ĕԂ��N���[�W��
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

        // �{�^������

        if(typeof(buttons) !== 'object'){
            // object����Ȃ��ꍇ�i�����v���~�e�B�u�j�ȏꍇ�̓p�����[�^�^�ɕϊ��B
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

        // DOM�ǉ�
        $dialog.append($dlgText, $dlgButtons);

        // focus
        if(options.focusedButton){
            $('.c-button-' + options.focusedButton, $dialog).focus();
        }

        return $dialog;
    }

    /**
     * �w�ʃt�B���^�[�����A�Ԃ�
     *
     * @returns JQuery  filter
     */
    function createFilter(){
        return $('<div>').addClass('c-dialog-filter');
    }

    function setDlgOnDOM($dialog : JQuery, $filter : JQuery){
        //�t�B���^�[�T�C�Y�ݒ�
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


        // �E�B���h�E�Ƀ��T�C�Y�C�x���g�ǉ�
        $wnd.bind('resize', fnResizeWnd);

        // ����֐��ǉ�
        removeFunctionList.push(function(){
            $dialog.addClass('is-rehide');
            $filter.addClass('is-rehide');

            setTimeout(function(){
                $dialog.remove();
                $filter.remove();
            },250);
            $wnd.unbind('resize', fnResizeWnd);
        });

        // DOM�ǉ�
        $('body').append($dialog, $filter);

        // ���T�C�Y
        fnResizeDlgs();

        // �\��
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