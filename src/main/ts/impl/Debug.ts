// <reference ../ts-only/Idebug.ts />

/**
 * Created by yu on 2015/06/30.
 */
module Debug{
    export var impl : IDebug;

    export function log(...params : string[]) {
        if (this.impl) {
            this.impl.log(params);
        }
    }

    export function error(...params:string[]) {
        if (this.impl) {
            this.impl.error(params);
        }
    }

    export function assert(exp:any, param:any) {
        if (this.impl) {
            this.impl.assert(exp, param);
        }
    }
}