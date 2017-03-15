/// <reference path="../../lib/definitely/angularjs/angular-resource.d.ts" />

import {appName, apiBaseUrl} from '../constants';

export interface ReceiptResource extends ng.resource.IResource<ReceiptResource> {
    id       : number,
    entry_id : number,
    receipt_date : string,
    id_receipttype : string,
    receipt_rem  : string,
}

export interface ReceiptResourceClass extends ng.resource.IResourceClass<ReceiptResource> {
    update(model: any) : ReceiptResource;
}

export function receiptFactory($resource: ng.resource.IResourceService) : ReceiptResourceClass {
    const url = `${apiBaseUrl}/receipt/:id`;
    const params = {
        entry_id: '@entry_id',
        receipt_date: '@receipt_date',
        id_receipttype: '@id_receipttype',
        receipt_rem : '@receipt_rem',
    };
    const actions = {
        get:    {method: 'GET'},
        save:   {method: 'POST'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'},
    };

    return <ReceiptResourceClass> $resource(url, params, actions);
}

angular.module(appName).factory('ReceiptResource', ['$resource', receiptFactory]);
