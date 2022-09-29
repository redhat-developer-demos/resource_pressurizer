'use strict';
const {pressureCpu} = require('../pressurizers/cpu')
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

describe('Pressure CPU Tests', () => {
    before(async () => {

    });
    it('Can run pressurizeCpu', async () => {
        await pressureCpu()
    }).timeout(20000);
})


