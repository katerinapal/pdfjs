"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ttfjs = require("ttfjs");

var _ttfjs2 = _interopRequireDefault(_ttfjs);

var _array = require("../objects/array");

var _array2 = _interopRequireDefault(_array);

var _stream = require("../objects/stream");

var _stream2 = _interopRequireDefault(_stream);

var _dictionary = require("../objects/dictionary");

var _dictionary2 = _interopRequireDefault(_dictionary);

var _string = require("../objects/string");

var _string2 = _interopRequireDefault(_string);

var _utils = require("../utils");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

var embed = _ttfjs2.default.Subset.prototype.embed;
_ttfjs2.default.Subset.prototype.embed = function (doc) {
  embed.call(this);

  var font = this.object;
  font.prop('Subtype', 'Type0');
  font.prop('BaseFont', this.font.fontName);
  font.prop('Encoding', 'Identity-H');
  doc.addObject(font);

  var descendant = doc.createObject('Font');
  descendant.prop('Subtype', 'CIDFontType2');
  descendant.prop('BaseFont', this.font.fontName);
  descendant.prop('DW', 1000);
  descendant.prop('CIDToGIDMap', 'Identity');
  descendant.prop('CIDSystemInfo', new _dictionary2.default({
    'Ordering': new _string2.default('Identity'),
    'Registry': new _string2.default('Adobe'),
    'Supplement': 0
  }));

  font.prop('DescendantFonts', new _array2.default([descendant.toReference()]));

  // widths array
  var metrics = [],
      codeMap = this.cmap();
  for (var code in codeMap) {
    if (code < 32) continue;
    var gid = codeMap[code];
    var width = Math.round(this.font.tables.hmtx.metrics[gid] * this.font.scaleFactor);
    metrics.push(code - 31);
    metrics.push(new _array2.default([width]));
  }
  descendant.prop('W', new _array2.default(metrics));

  // font descriptor
  var descriptor = doc.createObject('FontDescriptor');
  descriptor.prop('FontName', this.font.fontName);
  descriptor.prop('Flags', this.font.flags);
  descriptor.prop('FontBBox', new _array2.default(this.font.bbox));
  descriptor.prop('ItalicAngle', this.font.italicAngle);
  descriptor.prop('Ascent', this.font.ascent);
  descriptor.prop('Descent', this.font.descent);
  descriptor.prop('CapHeight', this.font.capHeight);
  descriptor.prop('StemV', this.font.stemV);
  descendant.prop('FontDescriptor', descriptor.toReference());

  // unicode map
  var cmap = new _stream2.default(doc.createObject());
  cmap.writeLine('/CIDInit /ProcSet findresource begin');
  cmap.writeLine('12 dict begin');
  cmap.writeLine('begincmap');
  cmap.writeLine('/CIDSystemInfo <<');
  cmap.writeLine('  /Registry (Adobe)');
  cmap.writeLine('  /Ordering (Identity)');
  cmap.writeLine('  /Supplement 0');
  cmap.writeLine('>> def');
  cmap.writeLine('/CMapName /Identity-H');
  cmap.writeLine('/CMapType 2 def');
  cmap.writeLine('1 begincodespacerange');
  cmap.writeLine('<0000><ffff>');
  cmap.writeLine('endcodespacerange');

  var mapping = this.subset,
      lines = [];
  for (code in mapping) {
    if (lines.length >= 100) {
      cmap.writeLine(lines.length + ' beginbfchar');
      lines.forEach(function (line) {
        cmap.writeLine(line);
      });
      cmap.writeLine('endbfchar');
      lines = [];
    }

    lines.push('<' + ('0000' + (+code - 31).toString(16)).slice(-4) + '>' + // cid
    '<' + ('0000' + mapping[code].toString(16)).slice(-4) + '>' // gid
    );
  }

  if (lines.length) {
    cmap.writeLine(lines.length + ' beginbfchar');
    lines.forEach(function (line) {
      cmap.writeLine(line);
    });
    cmap.writeLine('endbfchar');
  }

  cmap.writeLine('endcmap');
  cmap.writeLine('CMapName currentdict /CMap defineresource pop');
  cmap.writeLine('end');
  cmap.writeLine('end');

  font.prop('ToUnicode', cmap.toReference());

  // font file
  var data = this.save();
  var hex = utils.asHex(data);

  var file = new _stream2.default(doc.createObject());
  file.object.prop('Length', hex.length + 1);
  file.object.prop('Length1', data.byteLength);
  file.object.prop('Filter', 'ASCIIHexDecode');
  file.content = hex + '>\n';
  descriptor.prop('FontFile2', file.toReference());
};

Object.defineProperty(_ttfjs2.default.Subset.prototype, 'isUsed', {
  enumerable: true,
  get: function get() {
    return this.pos > 33;
  }
});

_ttfjs2.default.Subset.prototype.toReference = function () {
  return this.object.toReference();
};
exports.default = _ttfjs2.default;
module.exports = exports.default;
