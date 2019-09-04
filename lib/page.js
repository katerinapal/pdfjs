Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stream = require("./objects/stream");

var _stream2 = _interopRequireDefault(_stream);

var _dictionary = require("./objects/dictionary");

var _dictionary2 = _interopRequireDefault(_dictionary);

var _array = require("./objects/array");

var _array2 = _interopRequireDefault(_array);

var _name = require("./objects/name");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page(doc, parent) {
  this.doc = doc;
  this.object = this.doc.createObject('Page');
  this.contents = new _stream2.default(doc.createObject());
  this.fonts = new _dictionary2.default({});
  this.xobjects = new _dictionary2.default({});
  this.pageNumber = 1;

  this.cursor = {
    y: this.doc.height - this.doc.opts.padding.top,
    x: 0
  };

  this.object.addProperty('Parent', parent.toReference());
  this.object.addProperty('Contents', this.contents.toReference());
  this.object.addProperty('Resources', new _dictionary2.default({
    ProcSet: new _array2.default([new _name2.default('PDF'), new _name2.default('Text'), new _name2.default('ImageB'), new _name2.default('ImageC'), new _name2.default('ImageI')]),
    Font: this.fonts,
    XObject: this.xobjects
  }));
};

Object.defineProperties(Page.prototype, {
  spaceLeft: {
    enumerable: true,
    get: function get() {
      return this.cursor.y - this.doc.padding.bottom;
    }
  }
});

Page.prototype.toReference = function () {
  return this.object.toReference();
};
exports.default = Page;
module.exports = exports.default;
