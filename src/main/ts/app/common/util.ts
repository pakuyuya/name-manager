export function matchUnlessHashkey(o1:any, o2:any) {
    return JSON.stringify(o1).replace(/,"\$\$hashKey":".+?"/g, '')
        === JSON.stringify(o2).replace(/,"\$\$hashKey":".+?"/g, '');
}

export function removeHashkey(src:any) : any {
    if (Array.isArray(src)) {
        return assign([], src);
    }
    if (isPrimitive(src)) {
        return src;
    }

    var output = {};
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

export function removeHashkeyDeep(src:any) : any {
    if (Array.isArray(src)) {
        let ret = [];
        for (let i=0, len=src.length; i<len; ++i) {
            ret.push(removeHashkeyDeep(src[i]));
        }
        return ret;
    }
    if (isPrimitive(src)) {
        return src;
    }

    var ret = {};
    for (var nextKey in src) {
        if (nextKey.indexOf('$$hashKey') === 0) {
            continue;
        }
        if (src.hasOwnProperty(nextKey)) {
            ret[nextKey] = removeHashkeyDeep(src[nextKey]);
        }
    }
    return ret;
}

export function jsonizeModelDeep(src: any) : any {
    if (Array.isArray(src)) {
        let ret = [];
        for (let i=0, len=src.length; i<len; ++i) {
            ret.push(safeJsonPost(removeHashkeyDeep(src)));
        }
        return ret;
    }
    if (isPrimitive(src)) {
        return src;
    }

    let ret : any = {};
    for (let key in src) {
        if (key.indexOf('$$hashKey') === 0) {
            continue;
        }
        if (src.hasOwnProperty(key)) {
            ret[key] = safeJsonPost(removeHashkeyDeep(src[key]));
        }
    }
    return ret;
}

export function safeJsonPost(param) {
    if (typeof param === 'string') {
        return param;
    }
    return JSON.stringify(param);
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
    return typeof json === 'string';
}

export function dateToSQLString(date: Date) : string {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

export function isPrimitive(obj: any) : boolean {
    const type = typeof obj;
    return obj === null || (type != "object" && type != "function");
}

export function getType(obj: any): string {
    return Object.prototype.toString.call(obj).slice(8, -1);
}