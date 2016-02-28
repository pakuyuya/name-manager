/**
 * ZIndexを生成するモジュール
 */
export module ZIndexer {
    let next_index:number = 0;

    export function next(min:number = 0) {
        const ret = (next_index > min) ? next_index : min;
        next_index = ret + 1;
        return ret;
    }
}