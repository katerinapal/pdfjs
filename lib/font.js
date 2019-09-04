"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ttf = require("./fonts/ttf");

var _ttf2 = _interopRequireDefault(_ttf);

var _name = require("./objects/name");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

var TYPES = ['regular', 'italic', 'bold', 'boldItalic', 'light', 'lightItalic'];

var Font = function Font(opts) {
  if (!('regular' in opts)) opts = { regular: opts };
  var self = this;
  this.subsets = {};
  TYPES.forEach(function (type) {
    if (type in opts) {
      // GLOBAL[('Buffer').toString()] is used instead of Buffer to trick browserify
      // to not load a Buffer polyfill just for instance testing. The `toString()` part
      // is used to trick eslint to not throw
      var isArrayBuffer = opts[type] instanceof ArrayBuffer;
      var isBuffer = typeof GLOBAL !== 'undefined' && opts[type] instanceof GLOBAL['Buffer'.toString()];
      if (!isArrayBuffer && !isBuffer) {
        throw new Error('Property `' + type + '` must be a Buffer or a Arraybuffer.');
      }
      self[type] = new _ttf2.default(opts[type]);
      self.subsets[type] = self[type].subset();
    }
  });
};

Font.prototype.subset = function (doc, id) {
  return new Subset(doc, this, id);
};

var Subset = function Subset(doc, font, id) {
  var self = this,
      i = 1;
  TYPES.forEach(function (type) {
    if (!(type in font)) return;
    self[type] = font[type].subset();
    self[type].id = new _name2.default('F' + id + '-' + i++);
    self[type].object = doc.createObject('Font');
    self[type].use(' ');
  });
};

Subset.prototype.addTo = function (page) {
  var self = this;
  TYPES.forEach(function (type) {
    if (!(type in self) || !self[type].isUsed) return;
    page.fonts.add(self[type].id, self[type].toReference());
  });
};

Subset.prototype.fromOpts = function (opts) {
  var type = typeFromOpts(opts);
  if (!(type in this)) throw new Error('Font for `' + type + '` not provided.');
  return this[type];
};

Subset.prototype.embed = function (doc) {
  var self = this;
  TYPES.forEach(function (type) {
    if (!(type in self) || !self[type].isUsed) return;
    self[type].embed(doc);
  });
};

function typeFromOpts(opts) {
  if (opts.bold === true) {
    if (opts.italic === true) return 'boldItalic';else return 'bold';
  } else if (opts.light === true) {
    if (opts.italic === true) return 'lightItalic';else return 'light';
  } else if (opts.italic === true) {
    return 'italic';
  } else {
    return 'regular';
  }
}
exports.default = Font;
module.exports = exports.default;
