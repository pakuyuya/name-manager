/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../lib/definitely/rxjs/rx.all.d.ts" />


import IQService = angular.IQService;

import {appName, templateBaseUrl} from '../constants';

import {Dialog} from '../common/dialog';

import systemUI = require('../common/systemui');
import * as U from '../common/util';

import {DialogSupportController} from './common/dialogSupport';
import {FormUtilSupport} from './common/formUtilSupport';


import {Subscribable} from '../common/subscribable';

import {NameResource, NameResourceClass} from '../resources/nameResource';
import {SubscriptionResource, SubscriptionResourceClass} from '../resources/subscriptionResource';


import {SendItemType} from '../services/sendItemTypeService';

import {CommonService} from '../services/commonService';
import {MemberTypeStoreService, MemberTypeDto} from "../services/memberTypeStoreService";
import {ReceiptResource, ReceiptResourceClass} from "../resources/receiptResource";
import {SendNameIndexStoreService, SendNameIndexDto} from "../services/sendNameIndexStoreService";
import {TermStoreService, TermDto} from "../services/termStoreService";

import {DirectorStoreService, DirectorDto} from '../services/directorStoreService';

interface Models {
    name : NameModel;
    subscription : SubscriptionModel;
}
class NameModel {
    public name_e     : string = '';
    public name_j     : string = '';
    public name_k     : string = '';
    public send_name_index: string = 'e';
    public id_term    : string = '1';
    public alias       : string = '';
    public category1   : string = '';
    public category2   : string = '';
    public tels        : Array<string> = [''];
    public fax         : string = '';
    public mails       : Array<string>;
    public url         : string = '';
    public rem_e      : string = '';
    public rem_j      : string = '';
    public sendindex   : number = 0;
    public addresses   : Array<{zip:string, address:string}> = [{zip:'', address:''}];
    public country     : string = '';
    public cd_nametype : string = '';
    public id_membertype  : string = '1';
    public id_director: string = '0';
    public member_name  : string = '';
    public member_expire_on : string = '';
    public send_expire_on : string = '';
    public receipted_on  : string = '';
}
class MemberModel {
    public memberType : string = '';
}
class SubscriptionModel {
    public id_sendtype    : string = '';
    public send_govnumber   : string = '';
    public hirobaNum   : number = 1;
    public focusNum   : number;
}

export class EditNameDialogDirectiveController
    implements FormUtilSupport, DialogSupportController, Subscribable {
    public initModels: Models;
    public name: NameModel;
    public subscription: SubscriptionModel;
    public member_expire_on: Date = null;
    public send_expire_on: Date = null;
    public receipted_on: Date = null;
    public isMemberable:boolean = false;
    public isMatchExpire:boolean = true;
    public loading: boolean;
    public canceled: boolean = false;

    public terms: TermDto[];
    public directors: DirectorDto[];

    private element: JQuery;

    constructor(private $q: IQService, private nameResource: NameResourceClass,
                  private subscriptionResource: SubscriptionResourceClass,
                  private memberTypeStore: MemberTypeStoreService,
                  private sendNameIndexStore: SendNameIndexStoreService,
                  private termStore: TermStoreService,
                  private directorStore: DirectorStoreService,
                  private receiptResource: ReceiptResourceClass,
                  private common:CommonService) {
        this.terms = this.termStore.getAll();
        this.directors = this.directorStore.getAll();

        this.setupInitModels();
        this.clearModels();
    }

    public link(scope, element, attrs) {
        this.initDialogSupport(element);
        this.element = element;
    }

    public requestClose() {
        if (!U.matchUnlessHashkey(this.name, this.initModels.name)) {
            Dialog.show({
                text: '編集内容を破棄します。よろしいですか？',
                buttons: {ok: 'OK', ng: 'Cancel'},
                fixed : false,
                callback: (id) => {
                    if (id === 'ok') {
                        this.canceled = true;
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
        this.removeAllPopups();

        this.emmit('closed', this);
    }

    public addAddress() {
        this.name.addresses.push(this.createPlainAddress());
        this.onResizeCall();
    }

    public removeAddress(index: string) {
        const numIdx = Number(index);
        const numSendIdx =  this.name.sendindex;
        this.name.addresses.splice(numIdx, 1);
        this.onResizeCall();
        if (numIdx === numSendIdx) {
            this.name.sendindex = 0;
        } else if (numIdx < numSendIdx) {
            this.name.sendindex = (numSendIdx - 1);
        }
    }

    private setupInitModels() {
        let name = new NameModel;
        name.id_membertype = this.memberTypeStore.getDefault().value;

        let subscription = new SubscriptionModel();

        this.initModels =
            <Models>{
                name : name,
                subscription : subscription,
            };
    }

    public clearModels() {
        this.name = <NameModel>U.assignModel({}, this.initModels.name);
        this.subscription = <SubscriptionModel>U.assignModel({}, this.initModels.subscription);
    }

    private createPlainAddress() {
        return {zip : '', address : ''};
    }

    public tryRegister() {
        if (this.validateForm()) {
            this.register();
        } else {
            Dialog.show({
                text: '入力内容に警告があります。無視して登録しますか？',
                buttons: {ok: 'OK', ng: 'Cancel'},
                fixed : false,
                callback: (id) => {
                    if (id === 'ok') {
                        this.register();
                    }
                }
            });
        }
    }

    private validateForm() : boolean {
        let result = true;

        // HTML5の標準Validatorを使ってエラーメッセージをポップ
        this.element.find('input,textarea')
            .each((idx, el) => {
                let hiel = el as HTMLInputElement;
                if (!hiel.disabled && !hiel.checkValidity() ) {
                   this.popupWarning(`#${el.id}`, systemUI.getErrorMessage(el));
                   result = false;
                }
                return true;
            });

        // 名
        if (this.name.send_name_index === 'e' && this.name.name_e === '') {
            this.popupWarning('#editNameDialog_name_e', '住所ラベル用の連絡先は必須です');
            result = false;
        }
        if (this.name.send_name_index === 'j' && this.name.name_j === '') {
            this.popupWarning('#editNameDialog_name_j', '住所ラベル用の連絡先は必須です');
            result = false;
        }
        if (this.name.send_name_index === 'k' && this.name.name_k === '') {
            this.popupWarning('#editNameDialog_name_k', '住所ラベル用の連絡先は必須です');
            result = false;
        }

        if (this.isMemberable) {
            if (this.subscription.hirobaNum === 0 && this.subscription.focusNum === 0) {
                this.popupWarning('#editNameDialog_subscription_hirobaNum', '配布対象がありません');
                result = false;
            }
        }

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

        this.createNameResource()
            .$update()
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
        let name:NameResource = U.assign(this.name, {}) as any;

        // ラベル用の名前作成
        const sendNameIndex:SendNameIndexDto = this.sendNameIndexStore.get(this.name.send_name_index);
        const term:TermDto = this.termStore.get(this.name.id_term);

        let label = this.name[sendNameIndex.column];
        if (term.prefix) {
            label = `${term.prefix} ${label}`;
        }
        if (term.suffix) {
            label = `${label} ${term.suffix}`;
        }
        name.label = label;

        // 送信先住所の作成
        const sendAddress = this.name.addresses[this.name.sendindex];
        name.send_zipcode = sendAddress.zip;
        name.send_address = sendAddress.address;

        if (this.isMemberable) {
            // 会員の場合に補正
            this.name.member_expire_on = (this.member_expire_on)
                ? U.dateToSQLString(this.member_expire_on)
                : null;

            this.name.send_expire_on = (this.isMatchExpire)
                ? this.name.member_expire_on
                : U.dateToSQLString(this.send_expire_on);

        } else {
            // 会員ではない場合に補正
            name.id_membertype = this.memberTypeStore.getNone().value;
            name.member_name = '';
            name.member_expire_on = null;
            name.send_expire_on = null;
        }
        let returnResource = new this.nameResource(U.jsonizeModelDeep(name));

        return returnResource;
    }

    private createSubscription(name: NameResource, type: string, num: number) : SubscriptionResource {
        if (!this.subscription || !num)
            return this.common.noopResource() as SubscriptionResource;

        let id_sendtype = this.subscription.id_sendtype
                           || this.memberTypeStore.get(this.name.id_membertype).cd_sendtype;

        return new this.subscriptionResource({
            entry_id: name.id,
            send_num: num,
            id_send_item: type,
            id_sendtype: id_sendtype,
            send_govnumber: Number(this.subscription.id_sendtype) == 7 ? this.subscription.send_govnumber : '',
            send_enabled: true,
        });
    }

    private createReceipt(name: NameResource) : ReceiptResource {
        if (!this.isMemberable || !this.receipted_on) {
            return this.common.noopResource() as ReceiptResource;
        }
        return new this.receiptResource({
                entry_id: name.id,
                receipt_date: U.dateToSQLString(this.receipted_on),
                receipt_type: this.memberTypeStore.get(name.id_membertype).receiptTypeValue,
                receipt_rem: '',
            });
    }

    public autosetSendNameIndex(autosetIndex: string) {
        if (U.isBlank(this.name.name_e) && U.isBlank(this.name.name_j) && U.isBlank(this.name.name_k)) {
            this.name.send_name_index = autosetIndex;
        }
    }

    // mixin declaration

    // Subscribable
    public subscribers = {};
    public subscribe: (event:string, callback:(arg:any)=>void) => void;
    public emmit: (event: string, arg:any) => void;

    // DialogSupport
    public ctrlDlg:any = null;
    public initDialogSupport: (elm:JQuery) => void;
    public onResizeCall: () => void;
    public open: () => void;
    public close: () => void;
    public getDialog: () => JQuery;

    // FormUtilSupport
    popups: any = {};
    public popupWarning: (selector:string, text:string) => void;
    public removePopup: (selector:string) => void;
    public removeAllPopups: () => void;
    public toHerfValue: ($event:any) => void;
    public toHerfSpace: ($event:any) => void;
};

// mixin
U.applyMixins(EditNameDialogDirectiveController, [DialogSupportController, FormUtilSupport, Subscribable]);


class AddNameDialogDirective {
    restrict = 'E';
    controller = [
        '$q',
        'NameResource',
        'SubscriptionResource',
        'MemberTypeStore',
        'SendNameIndexStore',
        'TermStore',
        'DirectorStoreService',
        'ReceiptResource',
        'Common',
        EditNameDialogDirectiveController
    ];
    controllerAs = 'editNameDialog';
    replace = true;
    templateUrl = templateBaseUrl + '/add-name-dialog.html';

    public link(scope, element, attrs, ctrl) {
        ctrl.link(scope, element, attrs);
    }
};

angular.module(appName).directive('editNameDialog', function(){ return new AddNameDialogDirective(); } );