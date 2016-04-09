export function matchUnlessHashkey(o1:any, o2:any) {
    return JSON.stringify(o1).replace(/,"\$\$hashKey":".+?"/g, '')
        === JSON.stringify(o2).replace(/,"\$\$hashKey":".+?"/g, '');
}