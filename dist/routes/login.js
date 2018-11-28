'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoginRouter = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

var _convert_hash = require('../utils/convert_hash.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// .envファイルの読み込み
_dotenv2.default.config();

//署名作成ワードと有効期限(1時間)
var secret_word = process.env.SECRET_WORD;
var expiresIn = process.env.EXPIRESIN;

//署名作成関数
var createToken = function createToken(payload) {
    return _jsonwebtoken2.default.sign(payload, secret_word, { expiresIn: expiresIn });
};

//ログイン関数 true:OK false:NG
var isAuth = function isAuth(_ref, callback) {
    var username = _ref.username,
        password = _ref.password;

    // DBのユーザーデータと比較
    // passwordはハッシュ化してから

    // 対象IDのデータを検索するSelector
    var selector = {
        where: { username: username }
    };
    _index2.default.user.find(selector).then(function (instances) {
        if (instances) {
            // ハッシュ化したIDとDBのパスワードを比較
            if (instances.dataValues.password === (0, _convert_hash.convertHash)(password)) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

//ログインRouter
router.post('/', function (req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;

    //ログイン検証

    isAuth({ username: username, password: password }, function (result) {
        if (result) {
            //ログイン成功時に認証トークンを発行
            var access_token = createToken({ username: username, password: password });
            res.status(200).json({ access_token: access_token });
        } else {
            var status = 401;
            var message = 'Incorrect username or password';
            res.status(status).json({ status: status, message: message });
        }
    });
});

exports.LoginRouter = router;