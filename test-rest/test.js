"use strict";

const assert = require('power-assert');
const lutil = require('../local-util');

describe('sample', function() {

    it('should failed:', function() {
        var x = {test:1, test2:2, test3:3}
        var y = {test:1, test2:3};

        var result = lutil.filterMember(x, y);
        assert.deepStrictEqual(result, y);
    });
});