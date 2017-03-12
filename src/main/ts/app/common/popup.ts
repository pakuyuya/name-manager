/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
import {uuid, assign} from './util';

interface PopupOptions {
    duration? : number;
    hideon? : string[];
    hideon_elm? : string[];
    fadeInTime? : number;
    fadeOutTime? : number;
    x_offset?   : number;
    y_offset?   : number;
    datakey?    : string;
    shown?      : boolean;
};

export class Popup {
    private $popup: JQuery;
    private showRequested: boolean = false;
    private hideRequested: boolean =  false;
    private disposed: boolean = false;
    private options : PopupOptions =
        {
            duration : 0,
            hideon : ['click'],
            hideon_elm : [],
            fadeInTime : 200,
            fadeOutTime : 200,
            x_offset   : 5,
            y_offset   : -2,
            datakey    : uuid(),
            shown      : false,
        };

    public constructor(
        private $element : JQuery,
        private text : string,
        options : PopupOptions = {},
    ) {
        assign(this.options, options);
        this.attach($element, this.options.hideon_elm);
        if (this.options.shown) {
            this.requestShow();
        }
    }

    private attach($element:JQuery, hideon_elm:string[]) {
        $element.data(this.options.datakey, this);

        for (let event of hideon_elm) {
            $element.bind(event, () => this.requestHide());
        }
    }

    private dettach(element:JQuery, hideon_elm:string[] = this.options.hideon_elm) {
        delete element[this.options.datakey];

        for (let event of hideon_elm) {
            element.unbind(event, () => this.requestHide());
        }
    }

    public requestShow() {
        if (this.showRequested) {
            return;
        }
        this.showRequested = true;

        let $popup = this.createPopup(this.text);
        this.showPopup($popup);

        this.$popup = $popup;
    }

    private createPopup(text: string) : JQuery {
        let $outor = $(document.createElement('div'))
                .addClass('c-popup');
        let $inner = $(document.createElement('div'))
                .text(text)
                .addClass('c-popup__inner');
        $inner.appendTo($outor);

        return $outor;
    }

    private showPopup($popup: JQuery) {
        $popup.css({'opacity': '0.0', 'top' : '0', 'left' : '0'});
        this.$element.after($popup);

        setTimeout(() => {
            // async 1
            $popup.css('opacity', '');
            let parentOffset = $(this.$element).offset();
            let h = $popup.innerHeight();

            $popup.offset({
                    top : parentOffset.top - h + this.options.y_offset,
                    left : parentOffset.left + this.options.x_offset,
                });

            $popup.hide();
            $popup.fadeIn(this.options.fadeInTime, () => {
                // async 2
                this.setHideTrigger($popup);
            });
        }, 0);
    }

    private setHideTrigger($popup: JQuery) {
        for (const event of this.options.hideon) {
            $popup.bind(event, () => this.requestHide());
        }

        if (this.options.duration > 0) {
            window.setTimeout(() => this.requestHide() , this.options.duration);
        }
    }

    public requestHide() {
        if (this.hideRequested) {
            return;
        }
        this.hideRequested = true;

        this.hidePopup();
    }

    private hidePopup() {
        this.$popup.fadeOut(this.options.fadeOutTime, () => {
            this.dispose();
        });
    }

    public dispose() {
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        this.dettach(this.$element);
        this.$popup.remove();
        this.$popup = null;
    }

}