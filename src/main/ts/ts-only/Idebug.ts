/**
 * Created by yu on 2015/06/30.
 */
interface IDebug{
    log(params : string[]);
    error(params : string[]);
    assert(exp : any, param : any);
}