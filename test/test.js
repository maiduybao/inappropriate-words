const chai = require("chai");
const Filter = require('../index');

chai.should();
const assert = chai.assert;

describe("Filter tests", function() {
    describe("#isProfane", function() {

        const filter = new Filter();

        it("Should detect a bad word and return a boolean value", async function () {
            assert.equal(true, await filter.isProfane("ash0le"));
        });

        it("Should return false when no bad word is detected", async function () {
            assert.equal(false, await filter.isProfane("wife"));
        });

        it("Should be able to detect a bad word in a sentence", async function () {
            assert.equal(true, await filter.isProfane("that person is an ash0le"));
        });

    });

    describe('#clean', function () {
        const filter = new Filter();

        it("Should replace a bad word within a sentence with asterisks except for first letter in non strict mode (******)", async function () {
            (await filter.clean("Don't be an ash0le")).should.equal("Don't be an ******");
        });
        it("Should replace a bad word within a sentence asterisks (******)", async function () {
            (await filter.clean("Don't be an ash0le")).should.equal("Don't be an ******");
        });

        it("Should replace multiple instances of any bad words within a sentence asterisks (******)", async function () {
            (await filter.clean("cnts ash0le knob xxx")).should.equal("**** ****** **** ***");
        });

        it("Should not replace anything within a sentence if there are no bad words", async function () {
            (await filter.clean("The cat ran fast")).should.equal("The cat ran fast");
        });
    });


});