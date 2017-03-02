/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../lib/definitely/rxjs/rx.all.d.ts" />


import IQService = angular.IQService;

import {appName, templateBaseUrl} from '../constants';

import {Dialog} from '../common/dialog'
import systemUI = require('../common/systemui');
import {matchUnlessHashkey, isBlank, assignModel, assign, dateToSQLString} from '../common/util';

import {DialogSupportController} from './common/dialogSupport';

import {NameResource, NameResourceClass} from '../resources/nameResource';
import {SubscriptionResource, SubscriptionResourceClass} from '../resources/subscriptionResource';

import {SendItemType} from '../services/sendItemTypeService';

import {CommonService} from '../services/commonService';
import {MemberTypeStoreService, MemberTypeDto} from "../services/memberTypeStoreService";
import {ReceiptResource, ReceiptResourceClass} from "../resources/receiptResource";

interface Models {
    name : NameModel;
    subscription : SubscriptionModel;
}
class NameModel {
    public name_e     : string = '';
    public name_j     : string = '';
    public name_k     : string = '';
    public alias       : string = '';
    public category1   : string = '';
    public category2   : string = '';
    public tels        : Array<string> = [''];
    public fax         : string = '';
    public mails       : Array<string>;
    public url         : string = '';
    public rem_e      : string = '';
    public rem_j      : string = '';
    public sendindex   : string = '0';
    public addresses   : Array<{zip:string, address:string}> = [{zip:'', address:''}];
    public country     : string = '';
    public cd_nametype : string = '';
    public cd_membertype  : string = '1';
    public member_name  : string = '';
    public member_expire_on : string = '';
    public receipted_on  : string = '';
}
class MemberModel {
    public memberType : string = '';
}
class SubscriptionModel {
    public sendType    : string = '';
    public govNumber   : string = '';
    public hirobaNum   : string = '';
    public focusNum   : string = '';
}

class AddNameDialogDirectiveController extends DialogSupportController {
    public initModels: Models;
    public name: NameModel;
    public subscription: SubscriptionModel;
    public member_expire_on: Date = null;
    public receipted_on: Date = null;
    public sendindex: number = 0;
    public isMember:boolean = false;
    public isSend:boolean = false;
    public loading: boolean;

    private element: JQuery;

    constructor(private $q: IQService, private nameResource: NameResourceClass,
                  private subscriptionResource: SubscriptionResourceClass,
                  private memberTypeStore: MemberTypeStoreService,
                  private receiptResource: ReceiptResourceClass,
                  private common:CommonService) {
        super();

        this.setupInitModels();
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
        this.forceClose();
    }

    public forceClose() {
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

    private setupInitModels() {
        let name = new NameModel;
        name.cd_membertype = this.memberTypeStore.getDefault().value;

        let subscription = new SubscriptionModel();

        this.initModels =
            <Models>{
                name : name,
                subscription : subscription,
            };
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

        let msgName = isBlank(this.name.name_e) && isBlank(this.name.name_j) ?
                            '英語、日本語の名前のいずれかが必須です。' : '';

        let msgSendNum = this.isSend && !(this.subscription.hirobaNum || 0) && !(this.subscription.focusNum || 0) ?
                            '配送数は必須です。' : '';


        // エラーメッセージをポップ
        // this.element.find('form').each((idx, el) => systemUI.popFormErrorsAsync(el));
        //
        // this.element.find('input,textarea')
        //      .each(function(idx, el) : any {
        //          result = result && (<any>el).checkValidity();
        //          return true;
        //      });

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

        var onError = (reason) => {
            if (failed) {
                return;
            }

            this.loading = false;
            console.error(reason);
            systemUI.systemErr();
            failed = true;

            throw reason;
        };

        this.createNameResource().$save()
            .catch(onError)
            .then((data: any) : any => {
                name = data;
                return this.$q.all([
                    this.createSubscription(name, SendItemType.Hiroba, Number(this.subscription.hirobaNum))
                        .$save()
                        .catch(onError),
                    this.createSubscription(name, SendItemType.Forcus, Number(this.subscription.focusNum))
                        .$save()
                        .catch(onError),
                    this.createReceipt(name)
                        .$save()
                        .catch(onError),
                ]);
            })
            .then(() => {
                this.loading = false;
                this.forceClose();
            })
            .finally(() => {
                if (failed) {
                    if (name) { this.nameResource.remove(name); }
                }
            });
    }

    private createNameResource() : NameResource {
        let name:NameResource = assign(this.name, {}) as any;

        // 送信先住所の作成
        const sendAddress = this.name.addresses[this.name.sendindex];
        name.send_zipcode = sendAddress.zip;
        name.send_address = sendAddress.address;


        if (this.isMember) {
            // 会員の場合に補正

            this.name.member_expire_on = (this.member_expire_on)
                ? dateToSQLString(this.member_expire_on)
                : null;

        } else {
            // 会員ではない場合に補正
            name.cd_membertype = this.memberTypeStore.getNone().value;
            name.member_name = '';
            name.member_expire_on = null;
        }

        return new this.nameResource(name);
    }

    private createSubscription(name: NameResource, type: string, num: number) : SubscriptionResource {
        if (!this.subscription || !num)
            return this.common.noopResource() as SubscriptionResource;

        console.log('new subscription type:' + type);

        return new this.subscriptionResource({
            entry_id: name.id,
            send_num: num,
            send_item_id: type,
            sendtype_id: this.subscription.sendType,
            send_enabled: true,
        });
    }

    private createReceipt(name: NameResource) : ReceiptResource {
        if (!this.subscription || !this.receipted_on) {
            return this.common.noopResource() as ReceiptResource;
        }
        return new this.receiptResource({
                entry_id: name.id,
                receipt_date: dateToSQLString(this.receipted_on),
                receipt_type: this.memberTypeStore.get(name.cd_membertype).receiptTypeValue,
                receipt_rem: '',
            });
    }
};

class AddNameDialogDirective {
    restrict = 'E';
    controller = ['$q', 'NameResource', 'SubscriptionResource', 'MemberTypeStore', 'ReceiptResource', 'Common', AddNameDialogDirectiveController];
    controllerAs = 'addNameDialog';
    replace = true;
    templateUrl = templateBaseUrl + '/add-name-dialog.html';

    public link(scope, element, attrs, ctrl) {
        ctrl.link(scope, element, attrs);
    }
};

angular.module(appName).directive('addNameDialog', function(){ return new AddNameDialogDirective(); } );
