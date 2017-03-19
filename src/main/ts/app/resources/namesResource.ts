/// <reference path="../../lib/definitely/angularjs/angular-resource.d.ts" />

import {appName, restApiBaseUrl} from '../constants';

export interface NamesResource extends ng.resource.IResource<NamesResource> {
    id         : string;
    memberLabel: string;
    name       : string;
    expiredAt  : string;
}

export interface NamesResourceClass extends ng.resource.IResourceClass<NamesResource> {
}

export function namesFactory($resource: ng.resource.IResourceService) : NamesResourceClass {
    var url = `${restApiBaseUrl}/namesearch`;
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
angular.module(appName).factory('NamesResource', ['$resource', namesFactory]);
