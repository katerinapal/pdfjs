Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reference = require("./reference");

var _reference2 = _interopRequireDefault(_reference);

var _dictionary = require("./dictionary");

var _dictionary2 = _interopRequireDefault(_dictionary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PDFObject = function PDFObject(id, rev) {
  this.id = id || null;
  this.rev = rev || 0;
  this.properties = new _dictionary2.default();
  this.reference = new _reference2.default(this);
  this.content = null;
};

PDFObject.prototype.addProperty = PDFObject.prototype.prop = function (key, val) {
  this.properties.add(key, val);
};

PDFObject.prototype.toReference = function () {
  return this.reference;
};

PDFObject.prototype.toString = function () {
  return this.id.toString() + ' ' + this.rev + ' obj\n' + (this.properties.length ? this.properties.toString() + '\n' : '') + (this.content !== null ? this.content.toString() + '\n' : '') + 'endobj';
};
exports.default = PDFObject;
module.exports = exports.default;
