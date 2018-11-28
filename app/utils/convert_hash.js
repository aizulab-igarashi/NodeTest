import crypto from 'crypto';
import dotenv from 'dotenv';

// .envファイルの読み込み
dotenv.config();

// 文字列をハッシュ化して返す
export const convertHash = (str) => {
    // 暗号化
    let cipher = crypto.createCipher('aes192', str);
    cipher.update(process.env.SECRET_WORD, 'utf8', 'hex');
    const cipheredText = cipher.final('hex');
    return cipheredText;
}
