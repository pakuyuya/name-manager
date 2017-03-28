/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />

export module Tips{
    /**
     * 吹き出し付きメッセージを作成する。
     *
     * @param options
     */
    export function show(options : any){
        // オプション作成
        options = $.extend({
            text : '', // text
            bgColor : '#ffcccc',
            borderColor : '#aa5555',
            width : false,
            maxWidth : false,
            minWidth  :'70px',
            target : false,
            css : {
                color : '#500000',
                fontSize : '12px',
            },
        }, options || {});

        var $target : JQuery = $(options.target);

        if(!$target.length){
            // 無効なターゲット
            return false;
        }

        var $tips : JQuery = createTips(options);
        setTipsOnTarget($tips, $target);
    }

    /**
     * TipsのDOMを生成し返す
     * @param options
     * @returns jQuery
     */
    function createTips(options : any) : JQuery
    {
        var $tips =
            $('<div>').addClass('c-tips');

        $tips.css(options.css);

        // テキスト
        var $tipsText = $('<div>').addClass('c-tips-text')
                                    .text(options.text);

        var tipsTextCss : any = {};
        tipsTextCss.backgroundColor = options.bgColor;
        if(options.width) tipsTextCss.width = options.width;
        if(options.minWidth) tipsTextCss.minWidth = options.minWidth;
        if(options.maxWidth) tipsTextCss.maxWidth = options.maxWidth;

        $tipsText .css(tipsTextCss);

        // 吹き出し三角
        var $tipsTriangle = $('<div>').addClass('c-tips-triangle');

        var tipsTriangleCss : any = {};
        tipsTriangleCss.borderColor = options.borderColor;
        tipsTriangleCss.backgroundColor = options.bgColor;

        $tipsTriangle .css(tipsTriangleCss);

        // テキストの裏側
        var $tipsTextBack = $('<div>').addClass('c-tips-text-back');

        var tipsTextBackCss : any = {};
        tipsTextBackCss.borderColor = options.borderColor;

        $tipsTextBack.css(tipsTextBackCss);

        // DOM追加
        $tips.append($tipsText, $tipsTriangle, $tipsTextBack);
        return $tips;
    }


    function setTipsOnTarget($tips : JQuery, $target : JQuery){
        // 非表示のダミーDOMを作成し、BODYに追加することで、一度サイズを計算させる
        var $dmy = $('<div>').css({opacity: 0, position: 'absolute', top:0, height:0});
        $dmy.append($tips);

        var $body = $('body');

        $body.append($dmy);

        // 各DOM取得
        var $tipsText = $tips.children('.c-tips-text');
        var $tipsTriangle = $tips.children('.c-tips-triangle');
        var $tipsTextBack = $tips.children('.c-tips-text-back');

        // TextBackの短形設定
        $tipsTextBack.width($tipsText.outerWidth())
                     .height($tipsText.outerHeight());

        // Tips全体のOffset計算
        var offset = $target.offset();
        offset.left += $target.width() - 15;
        offset.top  -= $tipsText.outerHeight() + 2;

        // TriangleのOffset計算
        $tipsTriangle.css({
            top  : ($tipsText.outerHeight())+ 'px',
            left : '5px'
        });

        // DOMから削除
        $dmy.remove();
        $tips.remove();

        // 改めてDOMに登録
        //$body.append($tips);
        $target.parent().append($tips);
        $tips.offset(offset);

        // 除去イベント
        var removeFunc = function(){
            $tips.remove();
            $target.unbind('focus', buraFunc);
        };

        var buraFunc = function(){
            $tips.addClass('is-bura');
            $target.unbind('focus', buraFunc);
        };

        removeFunctionList.push(removeFunc);

        $tips.bind('click',removeFunc);
        $target.focus('focus', buraFunc);
    }

    var removeFunctionList : any = [];

    export function removeAll(){
        for(var i=0, len=removeFunctionList.length; i<len; ++i){
            removeFunctionList[i]();
        }
        removeFunctionList = [];
    }
}