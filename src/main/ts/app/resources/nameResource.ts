/// <reference path="../../lib/definitely/angularjs/angular-resource.d.ts" />

import {appName, restApiBaseUrl} from '../constants';

export interface NameResource extends ng.resource.IResource<NameResource> {
    id              : number;
    name_e          : string;
    name_j          : string;
    name_k          : string;
    send_name_index : string;
    label           : string;
    alias           : string;
    honorific       : string;
    category1       : string;
    category2       : string;
    tels            : string;
    fax             : string;
    mails           : string;
    url             : string;
    country         : string;
    rem_j           : string;
    rem_e           : string;
    sendindex       : number;
    addresses       : string;
    send_zipcode    : string;
    send_address    : string;
    postalzone      : string;
    id_director  : number;
    id_membertype   : string;
    member_name     : string;
    member_rem      : string;
    member_expire_on: string;
    term_id         : number;
    term            : string;

    $update() : angular.IPromise<NameResource>;
}

export interface NameResourceClass extends ng.resource.IResourceClass<NameResource> {
}

export function nameFactory($resource: ng.resource.IResourceService) : NameResourceClass {
    const url = `${restApiBaseUrl}/name/:id`;
    const params = {
        id : '@id',
        name_e : '@name_e',
        name_j : '@name_j',
        name_k : '@name_k',
        send_name_index : '@send_name_index',
        alias : '@alias',
        honorific : '@honorific',
        category1 : '@category1',
        category2 : '@category2',
        tels : '@tels',
        fax : '@fax',
        mails : '@mails',
        url : '@url',
        country : '@country',
        rem_j : '@rem_j',
        rem_e : '@rem_e',
        sendidex : '@sendindex',
        addresses : '@addresses',
        send_zipcode : '@send_zipcode',
        send_address : '@send_address',
        postalzone : '@postalzone',
        director_id : '@director_id',
        id_membertype : '@id_membertype',
        member_name : '@member_name',
        member_rem : '@member_rem',
        member_expire_on : '@member_expire_on',
        send_expire_on : '@send_expire_on',
        id_term : '@id_term',
        label : '@label',
    };
    const actions = {
        get:    {method: 'GET'},
        save:   {method: 'POST'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'},
    };

    return <NameResourceClass> $resource(url, params, actions);
}

angular.module(appName).factory('NameResource', ['$resource', nameFactory]);
