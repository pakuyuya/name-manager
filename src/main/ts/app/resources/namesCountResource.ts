/// <reference path="../../lib/definitely/angularjs/angular-resource.d.ts" />

import {appName, apiBaseUrl} from '../constants';

export interface NamesCountResource extends ng.resource.IResource<NamesCountResource>{
    count : number;
}

export interface NamesCountResourceClass extends ng.resource.IResourceClass<NamesCountResource> {
}

export function namesFactory($resource: ng.resource.IResourceService) : NamesCountResourceClass {
    var url = `${apiBaseUrl}` + 'names';
    var params = {
        lang: '@lang',
        name: '@name',
        memberTypes: '@memberTypes',
        sendTypes: '@sendTypes',
    };

    return <NamesCountResourceClass> $resource(url, params);
}
angular.module(appName).factory('NamesCountResource', ['$resource', namesFactory]);
