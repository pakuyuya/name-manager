"use strict";

var localUtil = {};

localUtil.filterMember = function(target, filter) {
    var obj = {};
    for (var k in filter) {
        if (target[k]) {
            obj[k] = target[k];
        }
    }
    return obj;
};

localUtil.filterMemberDeeply = function(target, filter) {
    var obj = {};
    for (var k in filter) {
        if (target[k]) {
            var member = target[k];
            var type = toString.call(target);
            obj[k] = (type === '[object Object]' || type === '[object Function]')
                        ? localUtil.filterMemberDeeply(member, filter[k]) : member;
        }
    }
    return obj;
};

module.exports = localUtil;