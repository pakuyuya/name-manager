/**
 * Created by yu on 2015/08/18.
 */

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />
/// <reference path="../../lib/definitely/jquery-ui/jquery-ui.d.ts" />


import {appName} from '../constants';
import app = require('../initmodule');

import '../resources/index'
import '../services/index';
import '../directives/index';

import {NamesListDirectiveController} from '../directives/namesList';
import {AddNameDialogDirectiveController} from '../directives/addNameDialog';
import {EditNameDialogDirectiveController} from "../directives/editNameDialog";
import {MemberTypeStoreService} from '../services/memberTypeStoreService';
import {CheckedNameService} from "../services/checkedNameService";

app.controller('HeaderCtrl', ['$scope', function($scope){
}]);

//
// MainDirective
//

class MainController {
    constructor(private $scope, private MemberTypes: MemberTypeStoreService, private checkedName:CheckedNameService) {
        this.MemberTypes.getAllAsync().then((memberTypes) => { this.memberTypes = memberTypes });

        setTimeout(() => {
            const ctlNamesList = $scope.namesList as NamesListDirectiveController;
            const ctlAddNameDialog = $scope.addNameDialog as AddNameDialogDirectiveController;
            const ctlEditNameDialog = $scope.editNameDialog as EditNameDialogDirectiveController;
            ctlAddNameDialog.subscribe('closed', () => ctlNamesList.serachWithStay());
            ctlEditNameDialog.subscribe('closed', () => ctlNamesList.serachWithStay());

            ctlNamesList.subscribe('change_clip', () => { this.refreshSelected(); });
        }, 0);
    }

    private refreshSelected() {
        this.selectedNum = this.checkedName.getLength();
    }

    public selectedNum = 0;
    public memberTypes = [];
}

class MainDirective {
    restrict = 'E';
    controller = ['$scope', 'MemberTypeStore', 'CheckedName', MainController];
    controllerAs = 'main';
    replace = true;
}

app.directive('main', () => new MainDirective());


$(function(){
    // datepicker有効化
    $('.ui-date').datepicker({dateFormat:'yy/mm/dd',});

    // 検索メニュー自動リサイズとハンドリング
    const $mainList = $('#main-list');
    const $namesListLeft = $('#names-list-left');
    const $wnd = $(window);

    function resizeMainList() {
        $mainList.css('height', ($wnd.height() - $mainList.offset().top) + 'px');
    }
    function resizeNameListLeft() {
        $namesListLeft.css('height', ($wnd.height() - $namesListLeft.offset().top) + 'px')
    }

    $wnd.resize(resizeMainList);
    $wnd.resize(resizeNameListLeft);

    setTimeout(() => $wnd.resize(), 0);
});