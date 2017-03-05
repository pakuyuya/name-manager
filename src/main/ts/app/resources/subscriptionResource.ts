/// <reference path="../../lib/definitely/angularjs/angular-resource.d.ts" />

import {appName, apiBaseUrl} from '../constants';

export interface SubscriptionResource extends ng.resource.IResource<SubscriptionResource> {
    id       : number,
    entry_id : number,
    send_num : number,
    send_item_id : string,
    cd_sendtype  : string,
    send_rem     : string,
    send_enabled : boolean,
}

export interface SubscriptionResourceClass extends ng.resource.IResourceClass<SubscriptionResource> {
    update(model: any) : SubscriptionResource;
}

export function subscriptionFactory($resource: ng.resource.IResourceService) : SubscriptionResourceClass {
    const url = `${apiBaseUrl}/subscription/:id`;
    const params = {
        entry_id: '@entry_id',
        send_num: '@send_num',
        send_item_id: '@send_item_id',
        cd_sendtype : '@cd_sendtype',
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
