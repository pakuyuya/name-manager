/// <reference path="../../lib/definitely/angularjs/angular-resource.d.ts" />

import {appName, apiBaseUrl} from '../constants';

export interface NamesResource extends ng.resource.IResource<NamesResource> {
    isMember: string;
    checked: boolean;
    name: string;
    address: string;
    expiredAt: string;
}

export interface NamesResourceClass extends ng.resource.IResourceClass<NamesResource> {
}

export function nameFactory($resource: ng.resource.IResourceService) : NamesResourceClass {
    var url = apiBaseUrl + '/name/:id';
    var params = {
        name_en: '@name_en',
        name_jp: '@name_jp',
        name_kn: '@name_kn',
        alias  : '@alias',
        honorific : '@honorific',
        category1 : '@category1',
        category2 : '@category2',
        fax : '@fax,',
        json_tel : '@json_tel',
        json_zipaddress : '@json_zipaddress',
        url : '@url',
        country : '@country',
        contrem_en : '@contrem_en',
        contrem_jp : '@contrem_jp',
        cd_nametype : '@cd_nametype',
    };

    return <NamesResourceClass> $resource(url, params);
}

angular.module(appName).factory('NameResource', ['$resource', nameFactory]);
