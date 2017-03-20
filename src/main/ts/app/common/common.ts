/**
 * ページ送りのリストを作成します。
 * @param from 開始idx
 * @param total idxの総計
 * @param showPages 表示するページの数
 * @param step ページあたりのidx数
 * @returns {Array} 表示するページ番号のリスト
 */
export function createShowPages(from:number, total:number, showPages:number, step:number, start:number = 1) : number[] {
    let cidx = ~~(from/step);
    let eidx = ~~((total-1)/step);

    let helf = ~~(showPages/2);

    let sidx = (() => {
        if (cidx < helf) return 0;
        if (cidx < eidx - showPages) return cidx - helf;
        return eidx - showPages;
    })();

    console.log(`${cidx} ${eidx} ${helf} ${sidx}`);

    let ary = [];
    for (let i=sidx; i <= eidx; ++i) {
        ary.push(i + start);
    }
    return ary;
}