/// <reference path="../lib/definitely/jquery/jquery.d.ts" />
/// <reference path="../lib/definitely/backbone/backbone.d.ts" />
/// <reference path="./../ts-only/Idebug.ts" />

/**
 *
 */
class DebugImpl implements IDebug{
    /**
     *
     * @param params
     */
    log(params : string[]){
        for(var i=0, len=params.length; i<len; ++i){
            console.log(params[i]);
        }
    }

    /**
     *
     * @param params
     */
    error(params : string[]){
        for(var i=0, len=params.length; i<len; ++i){
            console.error(params[i]);
        }
    }

    /**
     *
     * @param exp
     * @param param
     */
    assert(exp : any, param : any){
        console.assert(exp, param);
    }

}

Debug.impl = new DebugImpl();
