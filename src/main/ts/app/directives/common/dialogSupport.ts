/// <reference path="../../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../../lib/definitely/angularjs/angular.d.ts" />


export abstract class DialogSupportController {
    protected ctrlDlg:any = null;

    protected initDialogSupport(elm:JQuery) {
        const $dlg = elm.find('.c-dialog-wrapper');
        if ($dlg.length <= 0) {
            console.error(`<dialog> is not found! at following...`);
            console.error(elm);
        }

        this.ctrlDlg = angular.element($dlg.get(0)).controller('dialog');
        console.assert(this.ctrlDlg, `DialogDirective unregistered!`);
    }

    public onResizeCall() {
        this.ctrlDlg.adjustOnResize();
    }

    public open() {
        if (this.ctrlDlg) {
            this.ctrlDlg.open();
        }
    }
    public close() {
        if (this.ctrlDlg) {
            this.ctrlDlg.close();
        }
    }
}