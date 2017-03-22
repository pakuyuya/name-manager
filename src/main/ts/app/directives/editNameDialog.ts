/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../lib/definitely/rxjs/rx.all.d.ts" />


import IQService = angular.IQService;

import {appName, templateBaseUrl} from '../constants';

import {Dialog} from '../common/dialog';

import {Toast} from '../common/toast';

import systemUI = require('../common/systemui');
import * as U from '../common/util';

import {DialogSupportController} from './common/dialogSupport';
import {FormUtilSupport} from './common/formUtilSupport';


import {Subscribable} from '../common/subscribable';

import {NameResource, NameResourceClass} from '../resources/nameResource';
import {SubscriptionResource} from '../resources/subscriptionResource';

import {SubscriptionSearchService, SubscriptionSearchResult} from '../services/subscriptionSearchService';

import {SendItemType} from '../services/sendItemTypeService';

import {CommonService} from '../services/commonService';
import {ReceiptService} from '../services/receiptService';
import {MemberTypeStoreService, MemberTypeDto} from "../services/memberTypeStoreService";
import {ReceiptResource, ReceiptResourceClass} from "../resources/receiptResource";
import {SendNameIndexStoreService, SendNameIndexDto} from "../services/sendNameIndexStoreService";
import {TermStoreService, TermDto} from "../services/termStoreService";

import {DirectorStoreService, DirectorDto} from '../services/directorStoreService';
import {NameRepositoryService} from "../services/nameRepositoryService";

interface Models {
    name : NameModel;
    subscription : SubscriptionModel;
    dlg : DlgModel;
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
    public id_membertype  : string = '0';
    public id_director: string = '0';
    public member_name  : string = '';
    public member_expire_on : string = '';
    public send_expire_on : string = '';
    public receipted_on  : string = '';
}
class SubscriptionModel {
    public id_sendtype    : string = '';
    public send_govnumber   : string = '';
    public hirobaNum   : number;
    public focusNum   : number;
}
class DlgModel {
    public member_expire_on: Date = null;
    public send_expire_on: Date = null;
    public receipted_on: Date = null;
    public isMemberable:boolean = false;
    public isMatchExpire:boolean = true;
    public confirmed:boolean = false;
}

export class EditNameDialogDirectiveController
implements FormUtilSupport, DialogSupportController, Subscribable {
    public initModels: Models;
    public name: NameModel;
    public subscription: SubscriptionModel;
    public dlg: DlgModel;

    public loading: boolean = false;
    public canceled: boolean = false;

    public terms: TermDto[];
    public directors: DirectorDto[];

    private element: JQuery;

    /**
     * コンストラクタ
     */
    constructor(private $q: IQService,
                private nameRepository: NameRepositoryService,
                private subscriptionSearch: SubscriptionSearchService,
                private receipt: ReceiptService,
                private memberTypeStore: MemberTypeStoreService,
                private sendNameIndexStore: SendNameIndexStoreService,
                private termStore: TermStoreService,
                private directorStore: DirectorStoreService,
                private nameResource: NameResourceClass,
                private receiptResource: ReceiptResourceClass,
                private common:CommonService) {
        this.terms = this.termStore.getAll();
        this.directors = this.directorStore.getAll();
    }

    /**
     * Angular.Directive用linkメソッド
     * @param scope
     * @param element
     * @param attrs
     */
    public link(scope, element, attrs) {
        this.initDialogSupport(element);
        this.element = element;
    }

    //----------- public method -----------

    /**
     * 値の編集付きでダイアログを開く
     */
    public openWith(id: number) {
        this.open();
        let failed = false;

        let onError = (reason) => {
            if (failed) {
                return;
            }

            console.error(reason);
            systemUI.systemErr();

            throw reason;
        };

        this.$q.all([
            new this.nameResource({id : id})
                .$get()
                .catch(onError)
                .then((data) => data, onError),
            this.subscriptionSearch.query({entry_id : id})
                .catch(onError)
                .then((result) => result, onError),
        ]).then((results :any[]) => {
            if (failed) {
                this.forceClose();
                return;
            }

            let name = results[0] as NameResource;
            let subscriptions = (results[1] as SubscriptionSearchResult).datas;

            this.setupInitModels(name, subscriptions);
            this.restoreInitModels();
        });
    }

    /**
     * ダイアログを閉じる要求をする
     */
    public requestClose() {
        if (!U.matchUnlessHashkey(this.name, this.initModels.name)
            || !U.matchUnlessHashkey(this.subscription, this.initModels.subscription)) {
            Dialog.show({
                text: '編集内容を破棄します。よろしいですか？',
                buttons: {ok: 'OK', ng: 'Cancel'},
                fixed : false,
                callback: (id) => {
                    if (id === 'ok') {
                        this.canceled = true;
                        this.restoreInitModels();
                        this.forceClose();
                    }
                }
            });
            return;
        }
        this.forceClose();
    }

    /**
     * 警告メッセージなしにダイアログを強制的に閉じる
     */
    public forceClose() {
        this.close();
        this.restoreInitModels();
        this.removeAllPopups();

        this.emmit('closed', this);
    }

    //--------- UI ---------

    /**
     * 住所ラベルに使う住所のインデックスを自動更新する
     * @param autosetIndex
     */
    public autosetSendNameIndex(autosetIndex: string) {
        if (U.isBlank(this.name.name_e) && U.isBlank(this.name.name_j) && U.isBlank(this.name.name_k)) {
            this.name.send_name_index = autosetIndex;
        }
    }

    /**
     * 住所欄を追加する
     */
    public addAddress() {
        this.name.addresses.push(this.createPlainAddress());
        this.onResizeCall();
    }

    /**
     * 住所欄を削除する
     * @param index
     */
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

    /**
     * 会員期限を自動計算する
     */
    public calcMemberExpire() {
        let base: Date = (this.dlg.receipted_on) ? this.dlg.receipted_on : new Date;
        this.dlg.member_expire_on = this.receipt.getNextExpired(base);
    }

    /**
     * 登録を試みる
     */
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

    //------------ private method -----------

    /**
     * 内部の初期状態モデルを構築する
     */
    private setupInitModels(srcName: NameResource, subscriptions: SubscriptionResource[]) {
        let name = new NameModel();
        name = U.assign(name, srcName);
        name.addresses = JSON.parse(srcName.addresses);
        name.mails = JSON.parse(srcName.mails);
        name.tels = JSON.parse(srcName.tels);
        name.id_membertype = (this.memberTypeStore.get(srcName.id_membertype).none)
                               ? this.memberTypeStore.getDefault().value  : srcName.id_membertype;

        let subscription = new SubscriptionModel();
        for (let subs of subscriptions) {
            subscription.id_sendtype = subs.id_sendtype;
            subscription.send_govnumber = subscription.send_govnumber;
            switch (subs.id_send_item) {
                case SendItemType.Hiroba: subscription.hirobaNum = Number(subs.send_num);
                case SendItemType.Forcus: subscription.focusNum = Number(subs.send_num);
            }
        }

        let dlg = new DlgModel();
        dlg.isMemberable = !!(subscriptions.length) || !this.memberTypeStore.get(srcName.id_membertype).none;
        dlg.isMatchExpire = name.member_expire_on === name.send_expire_on;

        this.initModels =
            <Models>{
                name : name,
                subscription : subscription,
                dlg : dlg,
            };
        console.log(this.initModels);
    }

    /**
     * モデルを内部の初期状態モデルの状態に復元する
     */
    private restoreInitModels() {
        this.name = U.assignModel({}, this.initModels.name) as NameModel;
        this.subscription = U.assignModel({}, this.initModels.subscription) as SubscriptionModel;
        this.dlg = U.assignModel({}, this.initModels.dlg) as DlgModel;
    }

    /**
     * 空の住所モデルを作成する
     * @returns {{zip: string, address: string}}
     */
    private createPlainAddress() {
        return {zip : '', address : ''};
    }

    /**
     * フォームを検証する
     * @returns {boolean}
     */
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
            this.popupWarning('#addNameDialog_name_e', '住所ラベル用の連絡先は必須です');
            result = false;
        }
        if (this.name.send_name_index === 'j' && this.name.name_j === '') {
            this.popupWarning('#addNameDialog_name_j', '住所ラベル用の連絡先は必須です');
            result = false;
        }
        if (this.name.send_name_index === 'k' && this.name.name_k === '') {
            this.popupWarning('#addNameDialog_name_k', '住所ラベル用の連絡先は必須です');
            result = false;
        }

        if (this.dlg.isMemberable) {
            if (this.subscription.hirobaNum === 0 && this.subscription.focusNum === 0) {
                this.popupWarning('#addNameDialog_subscription_hirobaNum', '配布対象がありません');
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
        let name_id : number = null;

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

        let nameParam = this.createNameParam();
        let subsHirobaParam = this.createSubscriptionParam(SendItemType.Hiroba, Number(this.subscription.hirobaNum));
        let subsFocusParam = this.createSubscriptionParam(SendItemType.Forcus, Number(this.subscription.focusNum));


        let param = {
            'name' : nameParam,
            'subscriptions' : [subsHirobaParam, subsFocusParam].filter((d) => d !== null),
        };

        this.nameRepository.save(param)
            .then((response) => {
                name_id = response.id;
                return this.createReceiptResource(name_id, this.name.id_membertype);
            })
            .then(() => {
                Toast.push(`連絡先を登録しました。（登録番号 : ${name_id}）`);
                this.forceClose();
            }, onError)
            .finally(() => {
                this.loading = false;
                if (failed) {
                    new this.nameResource({id : name_id}).$remove();
                }
            });
    }

    /**
     * 入力状態からnameの登録パラメータを作成する
     * @returns {any}
     */
    private createNameParam() : any {
        let name: NameResource = U.assign(this.name, {}) as any;

        // ラベル用の名前作成
        const sendNameIndex: SendNameIndexDto = this.sendNameIndexStore.get(this.name.send_name_index);
        const term: TermDto = this.termStore.get(this.name.id_term);

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

        if (this.dlg.isMemberable) {
            // 会員の場合に補正
            this.name.member_expire_on = (this.dlg.member_expire_on)
                ? U.dateToSQLString(this.dlg.member_expire_on)
                : null;

            this.name.send_expire_on = (this.dlg.isMatchExpire)
                ? this.name.member_expire_on
                : U.dateToSQLString(this.dlg.send_expire_on);

        } else {
            // 会員ではない場合に補正
            name.id_membertype = this.memberTypeStore.getNone().value;
            name.member_name = '';
            name.member_expire_on = null;
            name.send_expire_on = null;
        }

        return name;
    }

    /**
     * 入力状態からsubscriptionの登録パラメータを作成する
     * @returns {any}
     */
    private createSubscriptionParam(type: string, num: number) : any {
        if (!this.dlg.isMemberable || !num)
            return null;

        let id_sendtype = this.subscription.id_sendtype
            || this.memberTypeStore.get(this.name.id_membertype).cd_sendtype;

        return {
            send_num: num,
            id_send_item: type,
            id_sendtype: id_sendtype,
            send_govnumber: Number(this.subscription.id_sendtype) == 7 ? this.subscription.send_govnumber : '',
            send_enabled: true,
        };
    }

    /**
     * 入力状態からReceiptResourceを作成する。
     * @param id
     * @param membertype
     */
    private createReceiptResource(id: number, membertype: string) : ReceiptResource {
        if (!this.dlg.isMemberable || !this.dlg.receipted_on) {
            return this.common.noopResource() as ReceiptResource;
        }
        return new this.receiptResource({
            entry_id: id,
            receipt_date: U.dateToSQLString(this.dlg.receipted_on),
            receipt_type: this.memberTypeStore.get(membertype).receiptTypeValue,
            receipt_rem: '',
        });
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


class EditNameDialogDirective {
    restrict = 'E';
    controller = [
        '$q',
        'NameRepository',
        'SubscriptionSearch',
        'Receipt',
        'MemberTypeStore',
        'SendNameIndexStore',
        'TermStore',
        'DirectorStoreService',
        'NameResource',
        'ReceiptResource',
        'Common',
        EditNameDialogDirectiveController
    ];
    controllerAs = 'editNameDialog';
    replace = true;
    templateUrl = templateBaseUrl + '/edit-name-dialog.html';

    public link(scope, element, attrs, ctrl) {
        ctrl.link(scope, element, attrs);
    }
};

angular.module(appName).directive('editNameDialog', function(){ return new EditNameDialogDirective(); } );
