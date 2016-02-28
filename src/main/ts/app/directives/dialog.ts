/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName, minDlgZIndex} from '../constants';
import {ZIndexer} from '../common/z-indexer';

export class DialogDirectiveController {
    private $dlg:JQuery = null;
    private $filter:JQuery = null;
    public isOpened: boolean = false;
    private dialogOffset = {
        top: 100,
        left: 'center',
    };
    private dialogSize = {
        width: 'auto',
        height: 'auto',
    };

    constructor(private $scope:angular.IScope) {
    }

    public link(scope, element:JQuery, attrs) {
        this.dialogOffset.top  = attrs.offsetTop  || this.dialogOffset.top;
        this.dialogOffset.left = attrs.offsetLeft || this.dialogOffset.left;

        this.dialogSize.width  = attrs.width  || this.dialogSize.width;
        this.dialogSize.height = attrs.height || this.dialogSize.height;

        setTimeout(() => {
            this.dialogfy(element)
            this.replaceDialog();
        }, 0);

        scope.$watch(angular.bind(this, function(){ return this.isOpened; }), () => this.refreshDisplay());
    }

    public resize(size:{width?:string, height?:string}) {
        this.dialogSize = $.extend(this.dialogSize, size);
    }
    public setOffset(offset:{top?, left?}) {
        this.dialogOffset = $.extend(this.dialogOffset, offset);
    }

    public open() {
        this.setupFilter();
        this.addjustZIndex();
        this.isOpened = true;
        if (!this.$scope.$$phase) {
            this.$scope.$apply();
        }
    }
    public close() {
        this.disposeFilter();
        this.isOpened = false;
        if (!this.$scope.$$phase) {
            this.$scope.$apply();
        }
    }

    public replaceDialog() {
        let offset = $.extend({}, this.dialogOffset);

        switch (offset.left) {
        case 'center':
            const $wnd = $(window);
            offset.left = $wnd.width() / 2 - this.$dlg.width() / 2;
            break;
        }

        this.$dlg.offset(offset);
    }

    public dialogfy(element: JQuery) {
        const $dlg = $('<div>').addClass('c-dialog');
        $dlg.appendTo($(document.body));

        element.appendTo($dlg);
        this.$dlg = $dlg;

        this.refreshDisplay();
    }

    private refreshDisplay() {
        if(this.$dlg) {
            if (this.isOpened) {
                this.$dlg.show();
                setTimeout(() => this.$dlg.addClass('is-shown'), 0);
            } else {
                this.$dlg.removeClass('is-shown');
                this.$dlg.hide();
            }
        }
    }

    private addjustZIndex() {
        if (this.$filter) {
            this.$filter.css('z-index', ZIndexer.next(minDlgZIndex));
        }
        if (this.$dlg) {
            this.$dlg.css('z-index', ZIndexer.next(minDlgZIndex));
        }
    }
    private setupFilter() {
        if (this.$filter) {
            this.disposeFilter();
        }

        const $doc = $(document);
        this.$filter = $('<div>')
                         .addClass('c-dialog-filter')
                         .offset({top: 0, left: 0})
                         .width($doc.outerWidth())
                         .height($doc.outerHeight());
        $(document.body).append(this.$filter);

        setTimeout(() => this.$filter.addClass('is-shown'), 0);
    }
    private disposeFilter() {
        if (this.$filter) {
            this.$filter.remove();
            delete this.$filter;
        }
    }
};

class DialogDirective {
    restrict = 'E';
    controller = ['$scope', DialogDirectiveController];
    controllerAs = 'dialog';
    scope = false;
    bindToController = false;
    replace = true;
    transclude = true;
    template = '<div class="c-dialog-wrapper">' +
                    '<div' +
                        ' style="width: {{ dialog.dialogSize.width }}; height: {{ dialog.dialogSize.height }};"' +
                        ' ng-transclude>' +
                    '</div>' +
                '</div>';

    public link(scope, element: JQuery, attrs, ctrl: DialogDirectiveController) {
        ctrl.link(scope, element, attrs);
    }
};

angular.module(appName).directive('dialog', function(){ return new DialogDirective(); } );
