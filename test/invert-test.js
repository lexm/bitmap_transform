'use strict';
var expect = require('chai').expect;
var eventEmitter = require(__dirname + '/../lib/emitter').emitter;
var invert = require(__dirname + '/../lib/invert');
var bmpio = require(__dirname + '/../lib/io');
var Bitmap = bmpio.Bitmap;
var bm = new Bitmap(__dirname + '/../img/palette-bitmap.bmp');
// var bm_nopal= new Bitmap(__dirname +  '/../img/non-palette-bitmap.bmp');

eventEmitter.on('fileRead', function() {
  bm.loadMetadata();
});

eventEmitter.on('metadataLoaded', function() {
  describe('testing isPalette function', function() {
    it('should return true for palette BMP', function() {
      expect(invert.isPalette(bm)).to.equal(true);
    });
  });
});
