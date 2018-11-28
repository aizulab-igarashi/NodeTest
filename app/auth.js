import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

// .envファイルの読み込み
dotenv.config();

//署名検証関数（非同期）
const verifyToken = token => {
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_WORD, (err, decode) => {
            decode !== undefined ? resolve(decode) : reject(err)
        });
    })
}

// ExpressAppを認証必須に変更
export const authRouter = (router) => {
    //認証が必要なRouter(ログイン以外全て)
    router.use(/^(?!\/login).*$/, async (req, res, next) => {
      //認証ヘッダー形式検証
      if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({status, message})
        return
      }

      //認証トークンの検証
      try {
        await verifyToken(req.headers.authorization.split(' ')[1])
        next()
      } catch (err) {
        //失効している認証トークン
        const status = 401
        const message = 'Error access_token is revoked'
        res.status(status).json({status, message})
      }
    });
}
