Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (array) {
  if (!array) array = [];

  array.toString = function () {
    return '[' + this.map(function (item) {
      return item.toString();
    }).join(' ') + ']';
  };

  return array;
};

;;
module.exports = exports.default;
