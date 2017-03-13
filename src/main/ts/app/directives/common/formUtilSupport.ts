/// <reference path="../../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../../lib/definitely/angularjs/angular.d.ts" />

import {Popup} from '../../common/popup';
import * as U from '../../common/util';

export class FormUtilSupport {
    public popups : any = {};

    public popupWarning(selector:string, text:string) :void {
        if (this.popups[selector]) {
            this.removePopup(selector);
        }

        let options = {
            shown : true,
            hideon_elm: ['blur'],
        };
        this.popups[selector] = new Popup($(selector), text, options);
    }

    public removePopup(selector:string) :void {
        if (this.popups[selector]) {
            this.popups[selector].dispose();
            delete this.popups[selector];
        }
    }

    public removeAllPopups() :void {
        for (let selector in this.popups) {
            this.removePopup(selector);
        }
    }

    public toHerfValue($event: any) :void {
        let $target = $($event.target);
        $target.val(U.toHalfWidth($target.val()));
    }

    public toHerfSpace($event: any) :void {
        let $target = $($event.target);
        $target.val($target.val().replace(/\s/g, ' '));
    }
}