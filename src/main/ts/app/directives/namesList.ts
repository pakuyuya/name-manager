/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants';
import {NameSearchService, NameSearchResult, NameSearchDto} from "../services/nameSearchService";
import {createShowPages} from '../common/common';

export class NamesListDirectiveController {
    datas: Array<any> = [{a:1}];
    query: any = {};
    idxfrom : number = 10;
    idxto   : number = 10;
    total   : number = 10;
    crtPage : number = 10;
    showPages : number[] = [];

    rowInPage : number = 20;

    constructor(private NameSearch: NameSearchService) {
        this.datas = [{a:1}];
        this.search();
    }

    public resetQuery() {
        this.query = {};
    }
    public search() {
        this.NameSearch.query(this.query)
            .then((greeting : NameSearchResult) => {
                this.idxfrom = greeting.idxfrom;
                this.idxto = greeting.idxto;
                this.total = greeting.total;
                this.datas = greeting.datas;

                this.crtPage = ~~(this.idxfrom / this.total) + 1;
                this.showPages = createShowPages(this.idxfrom, this.total, 5, this.rowInPage)
            });
    }

    public hasPrev() : boolean {
        return this.idxfrom === 0;
    }
    public hasNext() : boolean {
        return this.idxto < this.total;
    }

};

export class NamesListDirective {
    restrict = 'E';
    controller = ['NameSearch', NamesListDirectiveController];
    controllerAs = 'namesList';
    replace = true;
};

angular.module(appName).directive('namesList', function(){ return new NamesListDirective(); } );
