var PDFStream = function(object) {
  object.content = this
  this.object    = object
  this.content   = ''
};

PDFStream.prototype.slice = function(begin, end) {
  this.content = this.content.slice(begin, end)
  this.object.prop('Length', this.content.length - 1)
}

PDFStream.prototype.writeLine = function(str) {
  this.content += str + '\n'
  this.object.prop('Length', this.content.length - 1)
}

PDFStream.prototype.toReference = function() {
  return this.object.toReference()
}

PDFStream.prototype.toString = function() {
  return 'stream\n' +
         this.content +
         'endstream'

}
export default PDFStream;
