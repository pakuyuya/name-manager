export function matchUnlessHashkey(o1:any, o2:any) {
    return JSON.stringify(o1).replace(/,"\$\$hashKey":".+?"/g, '')
        === JSON.stringify(o2).replace(/,"\$\$hashKey":".+?"/g, '');
}

export function removeHashkey(src:any) {
    var output = Object();
    for (var nextKey in src) {
        if (nextKey.indexOf('$$hashKey') === 0) {
            continue;
        }
        if (src.hasOwnProperty(nextKey)) {
            output[nextKey] = src[nextKey];
        }
    }
    return output;
}

export function assign<T, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = source[id];
    }
    return target;
}

export function assignModel<T>(target:T, ...args: any[]):T {
    'use strict';
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    let output = Object(target);
    for (const source of args) {
        if (source !== undefined && source !== null) {
            for (const nextKey in source) {
                if (typeof(nextKey) === 'string' && nextKey.indexOf('$$hashKey') === 0) {
                    continue;
                }
                if (source.hasOwnProperty(nextKey)) {
                    output[nextKey] = source[nextKey];
                }
            }

        }
        return output;
    }
}

export function isBlank(str: string):boolean {
    return (!str || /^\s*$/.test(str));
}

export function isString(json: any):any {
    return Object.prototype.toString.call(json) === '[Object String]';
}

export function dateToSQLString(date: Date) : string {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}