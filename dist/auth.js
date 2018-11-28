'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRouter = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// .envファイルの読み込み
_dotenv2.default.config();

//署名検証関数（非同期）
var verifyToken = function verifyToken(token) {
  new Promise(function (resolve, reject) {
    _jsonwebtoken2.default.verify(token, process.env.SECRET_WORD, function (err, decode) {
      decode !== undefined ? resolve(decode) : reject(err);
    });
  });
};

// ExpressAppを認証必須に変更
var authRouter = exports.authRouter = function authRouter(router) {
  //認証が必要なRouter(ログイン以外全て)
  router.use(/^(?!\/login).*$/, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var status, message, _status, _message;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer')) {
                _context.next = 5;
                break;
              }

              status = 401;
              message = 'Error in authorization format';

              res.status(status).json({ status: status, message: message });
              return _context.abrupt('return');

            case 5:
              _context.prev = 5;
              _context.next = 8;
              return verifyToken(req.headers.authorization.split(' ')[1]);

            case 8:
              next();
              _context.next = 16;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](5);

              //失効している認証トークン
              _status = 401;
              _message = 'Error access_token is revoked';

              res.status(_status).json({ status: _status, message: _message });

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[5, 11]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};