import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { router } from './routes/index.js'

// app作成
const app = express();

// .envファイルの読み込み
dotenv.config();

// bodyParserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORSを許可する
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ログの設定
app.use(logger('combined'));

// /api/以下をimportしたRouterで設定
app.use('/api/', router);

// Port設定
const port = process.env.PORT || 3000;

// 設定したPortでapp起動
app.listen(port);
console.log('listen on port ' + port);
