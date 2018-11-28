import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import express from 'express';
import db from '../../models/index';
import { convertHash } from '../utils/convert_hash.js';

const router = express.Router();

// .envファイルの読み込み
dotenv.config();

//署名作成ワードと有効期限(1時間)
const secret_word = process.env.SECRET_WORD;
const expiresIn = process.env.EXPIRESIN;

//署名作成関数
const createToken = (payload) => {
    return jwt.sign(payload, secret_word, {expiresIn});
};

//ログイン関数 true:OK false:NG
const isAuth = ({username, password}, callback) => {
    // DBのユーザーデータと比較
    // passwordはハッシュ化してから

    // 対象IDのデータを検索するSelector
    const selector = {
      where: { username: username }
    };
    db.user.find(selector).then((instances) => {
        if(instances){
            // ハッシュ化したIDとDBのパスワードを比較
            if(instances.dataValues.password === convertHash(password)){
                callback(true);
            }else{
                callback(false);
            }
        }else{
            callback(false);
        }
    });
}

//ログインRouter
router.post('/', (req, res) => {
    const {username, password} = req.body

    //ログイン検証
    isAuth({username, password}, (result) => {
        if(result){
            //ログイン成功時に認証トークンを発行
            const access_token = createToken({username, password})
            res.status(200).json({access_token})
        }else{
            const status = 401
            const message = 'Incorrect username or password'
            res.status(status).json({status, message})
        }
    })
});

export { router as LoginRouter }
