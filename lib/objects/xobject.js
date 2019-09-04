Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object = require("./object");

var _object2 = _interopRequireDefault(_object);

var _stream = require("./stream");

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PDFXObject = function PDFXObject(id, rev) {
  _object2.default.call(this, id, rev);

  this.content = new _stream2.default(this);

  this.prop('Type', 'XObject');
  this.prop('Filter', 'ASCIIHexDecode');
};

PDFXObject.prototype = Object.create(_object2.default.prototype, {
  constructor: { value: PDFXObject }
});
exports.default = PDFXObject;
module.exports = exports.default;
