/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {DialogSupportController} from './common/dialogSupport';
import {DialogDirectiveController} from './dialog';
import {appName, templateBaseUrl} from '../constants';
import {Dialog} from '../common/dialog'

class AddNameDialogDirectiveController extends DialogSupportController {
    public initModel = {};
    public model = {};

    constructor() {
        super();
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

    public clearModels() {
        this.initModel = {};
        this.model = {};
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
