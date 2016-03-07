'use strict';
var expect = require('chai').expect;
var eventEmitter = require(__dirname + '/../lib/emitter').emitter;
var bmpio = require(__dirname + '/../lib/io');
var Bitmap = bmpio.Bitmap;
var bm = new Bitmap(__dirname + '/../img/palette-bitmap.bmp');

describe('testing object creation', function() {
  it('should be of type object', function () {
    expect(bm).to.be.an('object');
  });
});

eventEmitter.on('fileRead', function() {
  describe('testing file input', function() {
    it('should have a buffer in the bitmap prop', function(){
      expect(bm.bitmap).to.exist;
    });
    it('should find the header field to be "BM"', function() {
      expect(bm.bitmap.toString('ascii', 0, 2)).to.equal('BM');
    });
    bm.loadMetadata();
  });
});

eventEmitter.on('metadataLoaded', function() {
  describe('testing metadata load', function() {
    it('should now have "BM" in the headField property', function() {
      expect(bm.headField).to.equal('BM');
    });
    it('should have a size of 11078', function() {
      expect(bm.size).to.equal(11078);
    });
    it('should have pixelArrayStart as 1078', function() {
      expect(bm.pixelArrayStart).to.equal(1078);
    });
    it('should have paletteColors as 256', function() {
      expect(bm.paletteColors).to.equal(256);
    });
  });
});
