/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants';
import {NameSearchService, NameSearchResult, NameSearchDto} from "../services/nameSearchService";
import {createShowPages} from '../common/common';
import * as U from '../common/util';
import {CheckedNameService} from "../services/checkedNameService";
import {Dialog} from '../common/dialog';
import {systemErr} from "../common/systemui";
import {Subscribable} from "../common/subscribable";

export class NamesListDirectiveController implements Subscribable {
    datas: Array<any> = [];
    query: any = {};
    idxfrom : number = 10;
    idxto   : number = 10;
    total   : number = 10;
    crtPage : number = 10;
    showPages : {idx:number, from:number}[] = [];

    rowInPage : number = 20;

    reloading : boolean = false;

    constructor(private nameSearch: NameSearchService, private checkedNameService: CheckedNameService) {
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

    public clipAll() {
        this.nameSearch.queryAllId(this.query)
            .then((ids: string[]) => {
                for (let id of ids) {
                    this.checkedNameService.clip(id);
                }
                for (let data of this.datas) {
                    data.checked = true;
                }

                this.emmit('change_clip', this);
            }, () => {
                systemErr();
            });
    }

    public clearClips() {
        this.checkedNameService.clear();
        for (let data of this.datas) {
            data.checked = false;
        }
        this.emmit('change_clip', this);
    }

    public changeClip(data: NameSearchDto) : void {
        if (data.checked) {
            this.checkedNameService.clip(data.id);
        } else {
            this.checkedNameService.unclip(data.id);
        }
        this.emmit('change_clip', this);
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

    // Mixin

    // Subscribable
    public subscribers = {};
    public subscribe : (event:string, callback : (arg:any) => void) => void;
    public emmit : (event:string, arg:any) => void;
};
U.applyMixins(NamesListDirectiveController, [Subscribable]);


export class NamesListDirective {
    restrict = 'E';
    controller = ['NameSearch', 'CheckedName', NamesListDirectiveController];
    controllerAs = 'namesList';
    replace = true;
};

angular.module(appName).directive('namesList', function(){ return new NamesListDirective(); } );
