var PDFReference = function(object) {
  this.object = object
};

PDFReference.prototype.toString = function() {
  return this.object.id + ' ' + this.object.rev + ' R'
}
export default PDFReference;
