///<reference path="../ts-only/Idebug.ts" />
/**
 *
 */
class DebugDmy implements IDebug{
    log(params : string[]){
    }

    error(params : string[]){
    }

    assert(exp : any, param : any){
    }
}
Debug.impl = new DebugDmy();