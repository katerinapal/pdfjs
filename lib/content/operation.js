Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (op) {
  var operation = new Operation(op);
  this.contents.push(operation);

  return this;
};

;;

var Operation = function Operation(op) {
  this.op = op;
};

Operation.prototype.render = function (page) {
  page.contents.writeLine(this.op);
};
module.exports = exports.default;
