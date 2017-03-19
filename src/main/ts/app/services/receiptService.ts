/// <reference path="../../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../../lib/definitely/angularjs/angular.d.ts" />

import {appName} from '../constants'

import IQService = angular.IQService;

export class ReceiptService {
    constructor() {
    }

    public getNextExpired(src: Date) : Date {
        let date = new Date();
        date.setFullYear(
            src.getMonth() < 3 ? src.getFullYear() : src.getFullYear() + 1,
            2,
            31);
        return date;
    }
}

angular.module(appName).factory('Receipt', [() => {return new ReceiptService()}]);