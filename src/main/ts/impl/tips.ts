/// <reference path="../lib/definitely/jquery/jquery.d.ts" />

module Tips{
    /**
     * �����o���t�����b�Z�[�W���쐬����B
     *
     * @param options
     */
    export function show(options : any){
        // �I�v�V�����쐬
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
            // �����ȃ^�[�Q�b�g
            return false;
        }

        var $tips : JQuery = createTips(options);
        setTipsOnTarget($tips, $target);
    }

    /**
     * Tips��DOM�𐶐����Ԃ�
     * @param options
     * @returns jQuery
     */
    function createTips(options : any) : JQuery
    {
        var $tips =
            $('<div>').addClass('c-tips');

        $tips.css(options.css);

        // �e�L�X�g
        var $tipsText = $('<div>').addClass('c-tips-text')
                                    .text(options.text);

        var tipsTextCss : any = {};
        tipsTextCss.backgroundColor = options.bgColor;
        if(options.width) tipsTextCss.width = options.width;
        if(options.minWidth) tipsTextCss.minWidth = options.minWidth;
        if(options.maxWidth) tipsTextCss.maxWidth = options.maxWidth;

        $tipsText .css(tipsTextCss);

        // �����o���O�p
        var $tipsTriangle = $('<div>').addClass('c-tips-triangle');

        var tipsTriangleCss : any = {};
        tipsTriangleCss.borderColor = options.borderColor;
        tipsTriangleCss.backgroundColor = options.bgColor;

        $tipsTriangle .css(tipsTriangleCss);

        // �e�L�X�g�̗���
        var $tipsTextBack = $('<div>').addClass('c-tips-text-back');

        var tipsTextBackCss : any = {};
        tipsTextBackCss.borderColor = options.borderColor;

        $tipsTextBack.css(tipsTextBackCss);

        // DOM�ǉ�
        $tips.append($tipsText, $tipsTriangle, $tipsTextBack);
        return $tips;
    }


    function setTipsOnTarget($tips : JQuery, $target : JQuery){

        var tgtOffset = $target.offset();

        // ��\���̃_�~�[DOM���쐬���ABODY�ɒǉ����邱�ƂŁA��x�T�C�Y���v�Z������
        var $dmy = $('<div>').css({opacity: 0, position: 'absolute', top:0, height:0});
        $dmy.append($tips);

        var $body = $('body');

        $body.append($dmy);

        // �eDOM�擾
        var $tipsText = $tips.children('.c-tips-text');
        var $tipsTriangle = $tips.children('.c-tips-triangle');
        var $tipsTextBack = $tips.children('.c-tips-text-back');

        // TextBack�̒Z�`�ݒ�
        $tipsTextBack.width($tipsText.outerWidth())
                     .height($tipsText.outerHeight());

        // Tips�S�̂�Offset�v�Z
        var offset = $target.offset();
        offset.left += $target.width() - 15;
        offset.top  -= $tipsText.outerHeight() + 2;

        // Triangle��Offset�v�Z
        $tipsTriangle.css({
            top  : ($tipsText.outerHeight())+ 'px',
            left : '5px'
        });

        // DOM����폜
        $dmy.remove();
        $tips.remove();

        // ���߂�DOM�ɓo�^
        //$body.append($tips);
        $target.parent().append($tips);
        $tips.offset(offset);

        // �����C�x���g
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