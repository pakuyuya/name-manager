/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants';
import {NamesService, NamesDto} from '../services/namesService';

class NamesListDirectiveController {
    datas: Array<any> = [{a:1}];
    query: any = {};
    idxfrom : number = 10;
    idxto   : number = 10;
    total   : number = 10;

    constructor(private Names: NamesService) {
        this.datas = [{a:1}];
        this.search();
    }

    public resetQuery() {
        this.query = {};
    }
    public search() {
        this.datas = this.Names.query(this.query);
    }
};

class NamesListDirective {
    restrict = 'E';
    controller = ['Names', NamesListDirectiveController];
    controllerAs = 'namesList';
    replace = true;
};

angular.module(appName).directive('namesList', function(){ return new NamesListDirective(); } );
