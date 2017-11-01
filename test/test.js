const chai = require("chai");
const Filter = require('../index');

chai.should();
const assert = chai.assert;

describe("Filter tests", function() {
    describe("#isProfane", function() {

        const filter = new Filter();

        it("Should detect a bad word and return a boolean value", function (done) {
            assert.equal(true, filter.isProfane("ash0le"));
            done();
        });

        it("Should return false when no bad word is detected", function (done) {
            assert.equal(false, filter.isProfane("wife"));
            done();
        });

        it("Should be able to detect a bad word in a sentence", function (done) {
            assert.equal(true, filter.isProfane("that person is an ash0le"));
            done();
        });

    });

    describe('#clean', function () {
        const filter = new Filter();

        it("Should replace a bad word within a sentence with asterisks except for first letter in non strict mode (******)", function (done) {
            filter.clean("Don't be an ash0le").should.equal("Don't be an ******");
            done();
        });
        it("Should replace a bad word within a sentence asterisks (******)", function (done) {
            filter.clean("Don't be an ash0le").should.equal("Don't be an ******");
            done();
        });

        it("Should replace multiple instances of any bad words within a sentence asterisks (******)", function (done) {
            filter.clean("cnts ash0le knob xxx").should.equal("**** ****** **** ***");
            done();
        });

        it("Should not replace anything within a sentence if there are no bad words", function (done) {
            filter.clean("The cat ran fast").should.equal("The cat ran fast");
            done();
        });
    });


});