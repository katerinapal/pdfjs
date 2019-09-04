Object.defineProperty(exports, "__esModule", {
  value: true
});
var PDFReference = function PDFReference(object) {
  this.object = object;
};

PDFReference.prototype.toString = function () {
  return this.object.id + ' ' + this.object.rev + ' R';
};
exports.default = PDFReference;
module.exports = exports.default;
