'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// app作成
var app = (0, _express2.default)();

// .envファイルの読み込み
_dotenv2.default.config();

// bodyParserの設定
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// CORSを許可する
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ログの設定
app.use((0, _morgan2.default)('combined'));

// /api/以下をimportしたRouterで設定
app.use('/api/', _index.router);

// Port設定
var port = process.env.PORT || 3000;

// 設定したPortでapp起動
app.listen(port);
console.log('listen on port ' + port);