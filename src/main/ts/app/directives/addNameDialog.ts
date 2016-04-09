/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {DialogSupportController} from './common/dialogSupport';
import {DialogDirectiveController} from './dialog';
import {NameResource} from '../resources/nameResource';
import {appName, templateBaseUrl} from '../constants';
import {Dialog} from '../common/dialog'

interface AddNameModel {
    name_en     : string;
    name_jp     : string;
    name_kn     : string;
    alias       : string;
    honorific   : string;
    category1   : string;
    category2   : string;
    tels        : Array<string>;
    fax         : string;
    sendindex   : string;
    addresses   : Array<{zip:string, address:string}>;
    url         : string;
    country     : string;
    contrem_en  : string;
    contrem_jp  : string;
    cd_nametype : string;
}

class AddNameDialogDirectiveController extends DialogSupportController {
    public initModel: AddNameModel;
    public model:     AddNameModel;

    constructor() {
        super();
        this.clearModels();
    }

    public link(scope, element, attrs) {
        this.initDialogSupport(element);
    }

    public requestClose() {
        for (const k in this.model) {
            if (this.model[k] !== this.initModel[k]) {
                Dialog.show({
                    text: '編集内容を破棄します。よろしいですか？',
                    buttons : { ok : 'OK', ng : 'Cancel'},
                    callback:(id) => {
                        if (id === 'ok') {
                            this.clearModels();
                            this.close();
                        }
                    }
                });
                return;
            }
        }
        this.close();
        this.clearModels();
    }

    public addAddress() {
        this.model.addresses.push(this.createPlainAddress());
        this.onResizeCall();
    }

    public removeAddress(index: string) {
        const numIdx = Number(index);
        const numSendIdx =  Number(this.model.sendindex);
        this.model.addresses.splice(numIdx, 1);
        this.onResizeCall();
        if (numIdx === numSendIdx) {
            this.model.sendindex = '0';
        } else if (numIdx < numSendIdx) {
            this.model.sendindex = (numSendIdx - 1).toString();
        }
    }

    public clearModels() {
        this.initModel = <AddNameModel>{
            sendindex : '0',
            addresses : [this.createPlainAddress()],
        };
        this.model = <AddNameModel>{
            sendindex : '0',
            addresses : [this.createPlainAddress()],
        };
    }

    private createPlainAddress() {
        return {zip : '', address : ''};
    }
};

class AddNameDialogDirective {
    restrict = 'E';
    controller = [AddNameDialogDirectiveController];
    controllerAs = 'addNameDialog';
    replace = true;
    templateUrl = templateBaseUrl + '/add-name-dialog.html';

    public link(scope, element, attrs, ctrl) {
        ctrl.link(scope, element, attrs);
    }
};

angular.module(appName).directive('addNameDialog', function(){ return new AddNameDialogDirective(); } );
