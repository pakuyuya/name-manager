/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants';
import {NameSearchService, NameSearchResult, NameSearchDto} from "../services/nameSearchService";
import {createShowPages} from '../common/common';
import * as U from '../common/util';

export class NamesListDirectiveController {
    datas: Array<any> = [];
    query: any = {};
    idxfrom : number = 10;
    idxto   : number = 10;
    total   : number = 10;
    crtPage : number = 10;
    showPages : {idx:number, from:number}[] = [];

    rowInPage : number = 20;

    reloading : boolean = false;

    constructor(private nameSearch: NameSearchService) {
        this.datas = [];
        this.search();
    }

    public resetQuery() {
        this.query = {};
    }

    public search() {
        this.reload();
    }

    public serachWithStay() {
        this.reload(this.idxfrom);
    }

    public prevPage() {
        this.reload(this.idxfrom - this.rowInPage);
    }

    public nextPage() {
        this.reload(this.idxfrom + this.rowInPage);
    }

    public movePage(position: number) {
        this.reload(position);
    }

    public hasPrev() : boolean {
        return this.idxfrom > 0;
    }
    public hasNext() : boolean {
        return this.idxto + 1 < this.total;
    }

    private reload(offset:number = null) {
        if (this.reloading) {
            return;
        }

        this.reloading = true;

        let query:any = U.assign({}, this.query);
        if (offset !== null) {
            query.offset = offset;
        }

        this.nameSearch.query(query)
            .then((greeting : NameSearchResult) => {
                this.idxfrom = greeting.idxfrom;
                this.idxto = greeting.idxto;
                this.total = greeting.total;
                this.datas = greeting.datas;

                this.crtPage = ~~(this.idxfrom / this.rowInPage) + 1;
                this.showPages = createShowPages(this.idxfrom, this.total, 5, this.rowInPage)
                    .map((page) => { return {idx:page, from:(page-1) * this.rowInPage}; });

                this.reloading = false;
            });
    }
};

export class NamesListDirective {
    restrict = 'E';
    controller = ['NameSearch', NamesListDirectiveController];
    controllerAs = 'namesList';
    replace = true;
};

angular.module(appName).directive('namesList', function(){ return new NamesListDirective(); } );
