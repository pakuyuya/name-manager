/// <reference path="../../../lib/definitely/angularjs/angular-resource.d.ts" />

import globalConsts = require('../../globalconstants');
import appConsts = require('../setting/constants');

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
    var url = `${globalConsts.apiBaseUrl}` + 'names';
    var params = {
        lang: '@lang',
        memberTypes: '@memberTypes',
        sendTypes: '@sendTypes',
        name: '@name',
    };

    var queryAction: ng.resource.IActionDescriptor = {
        method: 'GET',
        isArray: true
    };
    return <NamesResourceClass> $resource(url, params, {query: queryAction });
}

var app = angular.module(appConsts.appName);
app.factory('Names', ['$resource', nameFactory]);
