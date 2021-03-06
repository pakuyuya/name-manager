/// <reference path="../../lib/definitely/angularjs/angular-resource.d.ts" />

import {appName, restApiBaseUrl} from '../constants';

export interface SubscriptionResource extends ng.resource.IResource<SubscriptionResource> {
    id       : number,
    entry_id : number,
    hiroba_num : number,
    focus_num : number,
    id_sendtype  : string,
    send_govnumber: string,
    send_rem     : string,
    send_enabled : boolean,

    $update() : angular.IPromise<SubscriptionResource>;
}

export interface SubscriptionResourceClass extends ng.resource.IResourceClass<SubscriptionResource> {
}

export function subscriptionFactory($resource: ng.resource.IResourceService) : SubscriptionResourceClass {
    const url = `${restApiBaseUrl}/subscription/:id`;
    const params = {
        entry_id: '@entry_id',
        hiroba_num: '@hiroba_num',
        focus_num: '@focus_num',
        id_send_item: '@id_send_item',
        id_sendtype : '@id_sendtype',
        send_govnumber: '@send_govnumber',
        send_rem    : '@send_rem',
        send_enabled: '@send_enabled',
    };
    const actions = {
        get:    {method: 'GET'},
        save:   {method: 'POST'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'},
    };

    return <SubscriptionResourceClass> $resource(url, params, actions);
}

angular.module(appName).factory('SubscriptionResource', ['$resource', subscriptionFactory]);
