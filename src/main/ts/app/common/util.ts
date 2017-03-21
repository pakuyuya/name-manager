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
    return (str === '' || /^\s*$/.test(str));
}

export function isString(json: any):any {
    return typeof json === 'string';
}

export function dateToSQLString(date: Date) : string {
    return date ? `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` : null;
}

export function isPrimitive(obj: any) : boolean {
    const type = typeof obj;
    return obj === null || (type != "object" && type != "function");
}

export function getType(obj: any): string {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
 * @see https://gist.github.com/jcxplorer/823878
 * @returns {string}
 */
export function uuid() : string {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

/**
 * @see https://jquery.nj-clucker.com/change-double-byte-to-half-width/
 * @param strVal
 * @returns {string}
 */
export function toHalfWidth(strVal){
    // 半角変換
    var halfVal = strVal.replace(/[！-～]/g,
        function( tmpStr ) {
            // 文字コードをシフト
            return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
        }
    );

    // 文字コードシフトで対応できない文字の変換
    return halfVal.replace(/”/g, "\"")
        .replace(/’/g, "'")
        .replace(/‘/g, "`")
        .replace(/￥/g, "\\")
        .replace(/　/g, " ")
        .replace(/〜/g, "~");
}

/**
 * @see https://www.typescriptlang.org/docs/handbook/mixins.html
 * @param derivedCtor
 * @param baseCtors
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        })
    })
}