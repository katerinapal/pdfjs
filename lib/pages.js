Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = require("./objects/array");

var _array2 = _interopRequireDefault(_array);

var _page = require("./page");

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pages = function Pages(doc) {
  this.doc = doc;
  this.tree = this.doc.createObject('Pages');
  this.pages = [];
  this.kids = new _array2.default();

  this.tree.addProperty('MediaBox', new _array2.default([0, 0, doc.width, doc.height]));
  this.tree.addProperty('Kids', this.kids);
  this.tree.addProperty('Count', this.count);
};

Object.defineProperty(Pages.prototype, 'count', {
  get: function get() {
    return this.kids.length;
  }
});

Pages.prototype.addPage = function () {
  var page = new _page2.default(this.doc, this.tree);

  this.pages.push(page);
  this.kids.push(page.toReference());
  this.tree.addProperty('Count', this.count);

  this.doc.subsets.forEach(function (subset) {
    subset.addTo(page);
  });

  return page;
};

Pages.prototype.removePageAt = function (index) {
  this.pages.splice(index, 1);
  this.kids.splice(index, 1);
  this.tree.addProperty('Count', this.count);
};

Pages.prototype.toReference = function () {
  return this.tree.toReference();
};
exports.default = Pages;
module.exports = exports.default;
