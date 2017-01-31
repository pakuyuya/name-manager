/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import systemUI = require('../common/systemui');
import {DialogSupportController} from './common/dialogSupport';
import {DialogDirectiveController} from './dialog';
import {NameResource} from '../resources/nameResource';
import {appName, templateBaseUrl} from '../constants';
import {Dialog} from '../common/dialog'
import {matchUnlessHashkey, removeHashkey, assignModel} from '../common/util';
import IQService = angular.IQService;

interface Models {
    name : NameModel;
    send : SendModel;
}
class NameModel {
    public name_en     : string;
    public name_jp     : string;
    public name_kn     : string;
    public alias       : string;
    public honorific   : string;
    public category1   : string;
    public category2   : string;
    public tels        : Array<string>;
    public fax         : string;
    public sendindex   : string = '0';
    public addresses   : Array<{zip:string, address:string}> = [{zip:'', address:''}];
    public url         : string;
    public country     : string;
    public contrem_en  : string;
    public contrem_jp  : string;
    public cd_nametype : string;
    public memberType  : string = '1';
    public memberName  : string;
    public expiredOn   : string;
    public reciptedOn  : string;
}
class SendModel {
    public sendType    : string = '';
    public govNumber   : string = '';
    public hirobaNum   : string = '';
    public forcusNum   : string = '';
}

class AddNameDialogDirectiveController extends DialogSupportController {
    public initModels: Models =
        <Models>{
            name : new NameModel(),
            send : new SendModel(),
        };
    public name: NameModel;
    public send: SendModel;
    public loading: boolean;

    private element: JQuery;

    constructor(private $q:IQService, private nameResource:NameResource) {
        super();
        this.clearModels();
    }

    public link(scope, element, attrs) {
        this.initDialogSupport(element);
        this.element = element;
    }

    public requestClose() {
        if (!matchUnlessHashkey(this.name, this.initModels.name)) {
            Dialog.show({
                text: '編集内容を破棄します。よろしいですか？',
                buttons: {ok: 'OK', ng: 'Cancel'},
                callback: (id) => {
                    if (id === 'ok') {
                        this.clearModels();
                        this.close();
                    }
                }
            });
            return;
        }
        this.close();
        this.clearModels();
    }

    public addAddress() {
        this.name.addresses.push(this.createPlainAddress());
        this.onResizeCall();
    }

    public removeAddress(index: string) {
        const numIdx = Number(index);
        const numSendIdx =  Number(this.name.sendindex);
        this.name.addresses.splice(numIdx, 1);
        this.onResizeCall();
        if (numIdx === numSendIdx) {
            this.name.sendindex = '0';
        } else if (numIdx < numSendIdx) {
            this.name.sendindex = (numSendIdx - 1).toString();
        }
    }

    public clearModels() {
        this.name = <NameModel>assignModel({}, this.initModels.name);
        this.send = <SendModel>assignModel({}, this.initModels.send);
    }

    private createPlainAddress() {
        return {zip : '', address : ''};
    }

    public tryRegister() {
        if (this.validateForm()) {
            this.register();
        }
    }

    private validateForm() {
        let result = true;

        this.element.find('form').each((idx, el) => systemUI.popFormErrorsAsync(el));

        this.element.find('input,textarea')
             .each(function(idx, el) : any {
                 result = result && (<any>el).checkValidity();
                 return true;
             });

        return result;
    }
    private register() {
        this.loading = true;

        console.log('submited');

        this.$q.all([
        ]).catch((reason) => {
            this.loading = false;
            console.error(reason);
            systemUI.systemErr();
        })
        .then(() => {
            this.loading = false;
            this.requestClose();
        });
    }
};

class AddNameDialogDirective {
    restrict = 'E';
    controller = ['$q', 'NameResource', AddNameDialogDirectiveController];
    controllerAs = 'addNameDialog';
    replace = true;
    templateUrl = templateBaseUrl + '/add-name-dialog.html';

    public link(scope, element, attrs, ctrl) {
        ctrl.link(scope, element, attrs);
    }
};

angular.module(appName).directive('addNameDialog', function(){ return new AddNameDialogDirective(); } );
