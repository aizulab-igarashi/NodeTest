'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../auth.js');

var _user = require('./user.js');

var _login = require('./login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Expressルーター作成
var router = exports.router = _express2.default.Router();

// Expressルーターに認証機能追加
(0, _auth.authRouter)(router);

// API読み込み
router.use('/login', _login.LoginRouter);
router.use('/user', _user.UserRouter);