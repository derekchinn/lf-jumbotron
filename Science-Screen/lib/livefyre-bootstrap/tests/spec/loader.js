'use strict';

var $ = require('jquery');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var loader = require('livefyre-bootstrap/loader');
var sinon = require('sinon');

describe('Loader', function () {
    var div;
    var getLoader = function (elem) {
        return $(elem).children().first();
    };

    beforeEach(function () {
        div = document.createElement('div');
    });

    it('decorates the provided element with a loader', function () {
        loader.decorate(div);
        expect(div.childNodes.length).to.equal(1);
        expect(div.childNodes[0].childNodes.length).to.equal(9);
    });

    it('decorates the provided element with an image loader in IE8/9', function () {
        var stub = sinon.stub(loader, 'isSupported').returns(false);
        loader.decorate(div);
        expect(getLoader(div).hasClass('lf-not-supported')).to.be.true;
        expect(div.childNodes[0].childNodes.length).to.equal(0);
        stub.restore();
    });

    it('sets the default size class if a size is not provided', function () {
        loader.decorate(div);
        expect(getLoader(div).hasClass('lf-small')).to.be.true;
    });

    it('sets the default size class if the provided string isn\'t valid', function () {
        loader.decorate(div, 'extra-wicked-large');
        expect(getLoader(div).hasClass('lf-small')).to.be.true;
    });

    it('sets the provided string size if valid', function () {
        loader.decorate(div, 'large');
        expect(getLoader(div).hasClass('lf-large')).to.be.true;
    });

    it('sets the default size class if the number provided is not divisible by 3', function () {
        loader.decorate(div, 17);
        expect(getLoader(div).hasClass('lf-small')).to.be.true;
    });

    it('sets the height and width to the provided size if divisible by 3', function () {
        loader.decorate(div, 666);
        var $loaderEl = getLoader(div);
        expect($loaderEl.height()).to.equal(666);
        expect($loaderEl.width()).to.equal(666);
    });

    it('throws an exception if the size is not a string or number', function () {
        var caught = false;
        try {
            loader.decorate(div, {});
        } catch(e) {
            caught = true;
        }
        assert(caught);

        // For some reason this isn't working...
        // expect(loader(div, {})).to.throw('[object Object] is not a valid argument.');
    });
});
