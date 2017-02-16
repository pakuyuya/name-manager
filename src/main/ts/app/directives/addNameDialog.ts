/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../lib/definitely/rxjs/rx.all.d.ts" />


import IQService = angular.IQService;

import {appName, templateBaseUrl} from '../constants';

import {Dialog} from '../common/dialog'
import systemUI = require('../common/systemui');
import {matchUnlessHashkey, isBlank, assignModel} from '../common/util';

import {DialogSupportController} from './common/dialogSupport';

import {NameResource, NameResourceClass} from '../resources/nameResource';
import {SubscriptionResource, SubscriptionResourceClass} from '../resources/subscriptionResource';

import {SendItemType} from '../services/sendItemTypeService';

interface Models {
    name : NameModel;
    subscription : SubscriptionModel;
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
class SubscriptionModel {
    public sendType    : string = '';
    public govNumber   : string = '';
    public hirobaNum   : string = '';
    public focusNum   : string = '';
}

class AddNameDialogDirectiveController extends DialogSupportController {
    public initModels: Models =
        <Models>{
            name : new NameModel(),
            subscription : new SubscriptionModel(),
        };
    public name: NameModel;
    public subscription: SubscriptionModel;
    public isMember:boolean = false;
    public isSend:boolean = false;
    public loading: boolean;

    private element: JQuery;

    constructor(private $q:IQService, private nameResource:NameResourceClass,
                  private subscriptionResource:SubscriptionResourceClass) {
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
        this.subscription = <SubscriptionModel>assignModel({}, this.initModels.subscription);
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

        let msgName = isBlank(this.name.name_en) && isBlank(this.name.name_jp) ?
                            '英語、日本語の名前のいずれかが必須です。' : '';
        (<any>$('#addNameDialog_name_en').get(0)).setCustomValidity(msgName);
        
        let msgSendNum = this.isSend && !(this.subscription.hirobaNum || 0) && !(this.subscription.focusNum || 0) ?
                            '配送数は必須です。' : '';
        (<any>$('#addNameDialog_subscription_hirobaNum').get(0)).setCustomValidity(msgName);


        // エラーメッセージをポップ
        this.element.find('form').each((idx, el) => systemUI.popFormErrorsAsync(el));
        
        this.element.find('input,textarea')
             .each(function(idx, el) : any {
                 result = result && (<any>el).checkValidity();
                 return true;
             });

        return result;
    }

    /**
     * 登録処理
     */
    private register() {
        // Note: サービス化したい

        this.loading = true;

        let failed = false;

        let name : NameResource = null;
        let hirobaSubs : SubscriptionResource = null;
        let forcusSubs : SubscriptionResource = null;

        var onError = (reason) => {
            this.loading = false;
            console.error(reason);
            systemUI.systemErr();
            failed = true;
            this.$q.reject(reason);
        };

        this.$q(() => name = this.nameResource.save(this.name))
            .catch(onError)
            .then((name:any) => {
                var createSubs = (num, type) => {
                        return (!this.subscription || !num) ? null
                                                             : <SubscriptionResource> {
                                                                 entry_id: name.id,
                                                                 send_num: num,
                                                                 send_item_id: type,
                                                                 sendtype_id: this.subscription.sendType,
                                                                 send_enabled: true,
                                                              };
                    };

                return this.$q.all([
                    this.$q((resolve) => { resolve(hirobaSubs = createSubs(SendItemType.Hiroba, this.subscription.hirobaNum)) }),
                    this.$q((resolve) => { resolve(forcusSubs = createSubs(SendItemType.Forcus, this.subscription.focusNum)) }),
                ]);
            })
            .catch(onError)
            .then(() => {
                this.loading = false;
                this.requestClose();
            })
            .finally(() => {
                if (failed) {
                    if (name) { this.nameResource.remove(name); }
                    if (hirobaSubs) { this.subscriptionResource.remove(hirobaSubs); }
                    if (forcusSubs) { this.subscriptionResource.remove(hirobaSubs); }
                }
            });
    }

};

class AddNameDialogDirective {
    restrict = 'E';
    controller = ['$q', 'NameResource', 'SubscriptionResource', AddNameDialogDirectiveController];
    controllerAs = 'addNameDialog';
    replace = true;
    templateUrl = templateBaseUrl + '/add-name-dialog.html';

    public link(scope, element, attrs, ctrl) {
        ctrl.link(scope, element, attrs);
    }
};

angular.module(appName).directive('addNameDialog', function(){ return new AddNameDialogDirective(); } );
