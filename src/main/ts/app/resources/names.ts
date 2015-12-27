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

export function namesFactory($resource: ng.resource.IResourceService) : NamesResourceClass {
    var url = `${apiBaseUrl}` + 'names';
    var params = {
        lang: '@lang',
        name: '@name',
        memberTypes: '@memberTypes',
        sendTypes: '@sendTypes',
    };

    var queryAction: ng.resource.IActionDescriptor = {
        method: 'GET',
        isArray: true
    };
    return <NamesResourceClass> $resource(url, params, {query: queryAction});
}

var app = angular.module(appName);
app.factory('Names', ['$resource', namesFactory]);
