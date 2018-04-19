'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lexer = require('./lexer');

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _v = require('./formats/v0');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Tags which contain arbitary non-parsed content
  For example: <script> JavaScript should not be parsed
*/
var childlessTags = ['style', 'script', 'template'];

/*
  Tags which auto-close because they cannot be nested
  For example: <p>Outer<p>Inner is <p>Outer</p><p>Inner</p>
*/
var closingTags = ['html', 'head', 'body', 'p', 'dt', 'dd', 'li', 'option', 'thead', 'th', 'tbody', 'tr', 'td', 'tfoot', 'colgroup'];

/*
  Tags which do not need the closing tag
  For example: <img> does not need </img>
*/
var voidTags = ['!doctype', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var parseDefaults = {
  voidTags: voidTags,
  closingTags: closingTags,
  childlessTags: childlessTags,
  format: _v2.default // transform for v0 spec
};

function parse(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDefaults;

  var tokens = (0, _lexer2.default)(str, options);
  var nodes = (0, _parser2.default)(tokens, options);
  return (0, _v2.default)(nodes, options);
}

var lib = { parse: parse, parseDefaults: parseDefaults };
var pkg = _extends({ default: lib }, lib);

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = pkg;
  }
  exports.himalaya = pkg;
} else {
  window.himalaya = pkg;
}
//# sourceMappingURL=index.js.map
