/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'
import {NamesResource, NamesResourceClass} from "../resources/names";

export class NamesService {
    constructor(private Names: NamesResourceClass) {
    }

    public getAll() {
        return [
        ];
    }
}

angular.module(appName).factory('names',['Names', NamesService]);