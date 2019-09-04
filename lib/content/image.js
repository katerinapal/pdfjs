Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (img, opts) {
  var image = new ImageInstance(this, img, opts);
  this.contents.push(image);
  return this;
};

var _image = require("../image");

var _image2 = _interopRequireDefault(_image);

var _utils = require("../utils");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;;

var ImageInstance = function ImageInstance(doc, img, opts) {
  this.doc = doc.doc || doc;
  this.image = img instanceof _image2.default ? img : this.doc.createImage(img);
  this.opts = opts || {};
};

ImageInstance.prototype.render = function (page, widthLeft) {
  var width, height;
  if (this.opts.width && this.opts.height) {
    width = this.opts.width;
    height = this.opts.height;
  } else if (this.opts.width) {
    width = this.opts.width;
    height = this.image.height * (this.opts.width / this.image.width);
  } else if (this.opts.height) {
    height = this.opts.height;
    width = this.image.width * (this.opts.height / this.image.height);
  } else {
    width = Math.min(this.image.width, widthLeft);
    height = this.image.height * (width / this.image.width);

    if (height > this.doc.innerHeight) {
      height = this.doc.innerHeight;
      width = this.image.width * (height / this.image.height);
    }
  }

  // page break
  if (utils.round(page.spaceLeft) < utils.round(height)) {
    var left = page.cursor.x;
    page = this.doc.pagebreak();
    page.cursor.x = left;
  }

  this.image.addTo(page);

  var x = page.cursor.x;
  var y = page.cursor.y - height;

  switch (this.opts.align) {
    case 'right':
      x += widthLeft - width;
      break;
    case 'center':
      x += (widthLeft - width) / 2;
      break;
    case 'left':
    default:
      break;
  }

  if (this.opts.wrap === false) {
    x = this.opts.x || x;
    y = this.opts.y && this.doc.height - height - this.opts.y || y;
  } else {
    page.cursor.y = y;
  }

  page.contents.writeLine('q'); // save graphics state
  page.contents.writeLine(width + ' 0 0 ' + height + ' ' + x + ' ' + y + ' cm'); // translate and scale
  page.contents.writeLine('/' + this.image.id + ' Do'); // paint image
  page.contents.writeLine('Q'); // restore graphics state
};

Object.defineProperties(ImageInstance.prototype, {
  maxWidth: {
    enumerable: true,
    get: function get() {
      return this.image.width;
    }
  }
});
module.exports = exports.default;
