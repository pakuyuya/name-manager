/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants';
import {NameSearchService, NameSearchResult, NameSearchDto} from "../services/nameSearchService";

class NamesListDirectiveController {
    datas: Array<any> = [{a:1}];
    query: any = {};
    idxfrom : number = 10;
    idxto   : number = 10;
    total   : number = 10;

    constructor(private NameSearch: NameSearchService) {
        this.datas = [{a:1}];
        this.search();
    }

    public resetQuery() {
        this.query = {};
    }
    public search() {
        const self = this;
        this.NameSearch.query(this.query)
            .then(function(greeting : NameSearchResult){
                self.idxfrom = greeting.idxfrom;
                self.idxto = greeting.idxto;
                self.total = greeting.total;
                self.datas = greeting.datas;
            });
    }
};

class NamesListDirective {
    restrict = 'E';
    controller = ['NameSearch', NamesListDirectiveController];
    controllerAs = 'namesList';
    replace = true;
};

angular.module(appName).directive('namesList', function(){ return new NamesListDirective(); } );
