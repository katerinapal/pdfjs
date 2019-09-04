Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = require('./name');

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PDFDictionary = function PDFDictionary(dictionary) {
  this.dictionary = {};
  if (dictionary) {
    for (var key in dictionary) {
      this.add(key, dictionary[key]);
    }
  }
};

PDFDictionary.prototype.add = function (key, val) {
  key = new _name2.default(key);
  if (typeof val === 'string') val = new _name2.default(val);
  this.dictionary[key] = val;
};

PDFDictionary.prototype.toString = function () {
  var self = this;
  return '<<\n' + Object.keys(this.dictionary).map(function (key) {
    return key.toString() + ' ' + self.dictionary[key].toString();
  }).join('\n').replace(/^/gm, '\t') + '\n' + '>>';
};

Object.defineProperty(PDFDictionary.prototype, 'length', {
  get: function get() {
    return Object.keys(this.dictionary).length;
  },
  enumerable: true
});
exports.default = PDFDictionary;
module.exports = exports.default;
