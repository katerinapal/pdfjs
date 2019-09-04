import PDFObject from "./object";
import PDFStream from "./stream";

var PDFXObject = function(id, rev) {
  PDFObject.call(this, id, rev)

  this.content = new PDFStream(this)

  this.prop('Type', 'XObject')
  this.prop('Filter', 'ASCIIHexDecode')
};

PDFXObject.prototype = Object.create(PDFObject.prototype, {
  constructor: { value: PDFXObject }
})
export default PDFXObject;
