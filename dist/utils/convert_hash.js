'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertHash = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// .envファイルの読み込み
_dotenv2.default.config();

// 文字列をハッシュ化して返す
var convertHash = exports.convertHash = function convertHash(str) {
    // 暗号化
    var cipher = _crypto2.default.createCipher('aes192', str);
    cipher.update(process.env.SECRET_WORD, 'utf8', 'hex');
    var cipheredText = cipher.final('hex');
    return cipheredText;
};