/**
 * Created by yu on 2015/08/18.
 */

/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />


import {appName} from '../constants';
import app = require('../initmodule');

import '../resources/index'
import '../services/index';
import '../directives/index';

import {MemberTypesService} from '../services/memberTypesService';

app.controller('HeaderCtrl', ['$scope', function($scope){
}]);


class MainController {
    constructor(private MemberTypes: MemberTypesService) {
        this.memberTypes = this.MemberTypes.getAll();
    }
    public selectedNum = 0;
    public memberTypes = [];
}

app.controller('MainCtrl', ['MemberTypes', MainController]);

$(function(){
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