'use strict';
const {pressureNetwork} = require('../pressurizers/network')
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

describe('Pressure Network Tests', () => {
    before(async () => {

    });
    it('Can run pressurizeNetwork', async () => {
        await pressureNetwork()
    }).timeout(20000);
})

module.exports = {}
