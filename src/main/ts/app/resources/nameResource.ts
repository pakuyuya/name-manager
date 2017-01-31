/// <reference path="../../lib/definitely/angularjs/angular-resource.d.ts" />

import {appName, apiBaseUrl} from '../constants';

export interface NameResource extends ng.resource.IResource<NameResource> {
    name_en     : string;
    name_jp     : string;
    name_kn     : string;
    alias       : string;
    honorific   : string;
    category1   : string;
    category2   : string;
    tels        : Array<string>;
    fax         : string;
    addresses   : Array<{send:boolean, zip:string, address:string}>;
    url         : string;
    country     : string;
    contrem_en  : string;
    contrem_jp  : string;
    cd_nametype : string;
}

export interface NameResourceClass extends ng.resource.IResourceClass<NameResource> {
    update(model: any) : NameResource;
}

export function nameFactory($resource: ng.resource.IResourceService) : NameResourceClass {
    const url = apiBaseUrl + '/name/:id';
    const params = {
        name_en: '@name_en',
        name_jp: '@name_jp',
        name_kn: '@name_kn',
        alias  : '@alias',
        honorific : '@honorific',
        category : '@category',
        tels : '@tels',
        fax : '@fax,',
        addresses : '@addresses',
        url : '@url',
        country : '@country',
        contrem_en : '@contrem_en',
        contrem_jp : '@contrem_jp',
        cd_nametype : '@cd_nametype',
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
