'use strict';
var expect = require('chai').expect;
var invert = require(__dirname + '/../lib/invert');
var bmpio = require(__dirname + '/../lib/ioBmp');
var Bitmap = bmpio.Bitmap;
var bm = new Bitmap(__dirname + '/../img/palette-bitmap.bmp');

describe('testing isPalette function', function() {
  before(function(done) {
    bm.readBitmapFile(done);
  });
  before(function(done) {
    bm.loadMetadata(done);
  });
  it('should return true for palette BMP', function() {
    expect(invert.isPalette(bm)).to.equal(true);
  });
});
