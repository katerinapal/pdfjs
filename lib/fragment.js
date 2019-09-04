Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = require("./content/image");

var _image2 = _interopRequireDefault(_image);

var _operation = require("./content/operation");

var _operation2 = _interopRequireDefault(_operation);

var _table = require("./content/table");

var _table2 = _interopRequireDefault(_table);

var _text = require("./content/text");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fragment = function Fragment(doc, opts) {
  this.opts = opts || {};

  this.doc = doc;

  this.width = this.opts.width || 612;
  if (!this.opts.padding) this.opts.padding = { top: 0, right: 0, bottom: 0, left: 0 };
  this.padding = new Padding(this);

  this.defaultFont = this.doc.defaultFont;

  this.areas = {};
  this.contents = [];
};

var Padding = function Padding(doc) {
  this.doc = doc;
};

Object.defineProperties(Padding.prototype, {
  left: { enumerable: true, get: function get() {
      return this.doc.opts.padding.left;
    } },
  right: { enumerable: true, get: function get() {
      return this.doc.opts.padding.right;
    } },
  top: { enumerable: true, get: function get() {
      return this.doc.opts.padding.top + (this.doc.areas.header ? this.doc.areas.header.height || 0 : 0);
    } },
  bottom: { enumerable: true, get: function get() {
      return this.doc.opts.padding.bottom + (this.doc.areas.footer ? this.doc.areas.footer.height || 0 : 0);
    } }
});

// <------- width ---------->
// __________________________
// | ______________________ |     ^
// | |                 ^  | |     |
// | |<-- innerWidth --|->| |     |
// | |                 |  | |     |
// | |                 |  | |     |
// | |                 |  | |     |
// | |                 |  | |     | height
// | |                 |  | |     |
// | |        innerHeight | |     |
// | |                 |  | |     |
// | |                 |  | |     |
// | |                 |  | |     |
// | |_________________v__| |     |
// |________________________|     v

Object.defineProperties(Fragment.prototype, {
  innerWidth: {
    enumerable: true,
    get: function get() {
      return this.width - this.padding.right - this.padding.left;
    }
  },
  innerHeight: {
    enumerable: true,
    get: function get() {
      return this.height - this.padding.top - this.padding.bottom;
    }
  },
  maxWidth: {
    enumerable: true,
    get: function get() {
      return this.opts.width || Math.max.apply(Math, this.contents.map(function (content) {
        return content.maxWidth;
      }));
    }
  },
  minHeight: {
    enumerable: true,
    get: function get() {
      return Math.max.apply(Math, this.contents.map(function (content) {
        return content.minHeight;
      }));
    }
  }
});

Fragment.prototype.pagebreak = function () {
  var page = this.doc.pagebreak();
  this.doc.cursor.cursor.x += this.padding.left;
  return page;
};

Fragment.prototype.render = function (page, width, context) {
  var x = page.cursor.x;
  page.cursor.x += this.padding.left;
  if (width) width = width - this.padding.right - this.padding.left;

  if ('top' in this.opts && (this.doc.height - this.opts.top < page.cursor.y || this.opts.position === 'force')) {
    page.cursor.y = this.doc.height - this.opts.top;
  }
  var self = this,
      y = page.cursor.y;
  this.contents.forEach(function (content) {
    content.render(self.doc.cursor, width || self.innerWidth, context);
  });
  if ('minHeight' in this.opts && this.doc.cursor === page && y - this.opts.minHeight < page.cursor.y) {
    page.cursor.y = y - this.opts.minHeight;
  }

  page.cursor.x = x;
};

Fragment.prototype.registerFont = function (font) {
  return this.doc.registerFont(font);
};

Fragment.prototype.createObject = function (type) {
  return this.doc.createObject(type);
};

Fragment.prototype.createXObject = function (subtype) {
  return this.doc.createXObject(subtype);
};

Fragment.prototype.image = _image2.default;
Fragment.prototype.op = _operation2.default;
Fragment.prototype.table = _table2.default;
Fragment.prototype.text = _text2.default;

Fragment.prototype.fragment = function (opts, definition) {
  if (typeof opts === 'function') {
    definition = opts;
    opts = {};
  }

  var fragment = new Fragment(this.doc, opts);
  definition.call(fragment, fragment);
  this.contents.push(fragment);

  return this;
};
exports.default = Fragment;
module.exports = exports.default;
