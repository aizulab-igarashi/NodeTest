import express from 'express';
import db from '../../models/index';
import { convertHash } from '../utils/convert_hash.js';

const router = express.Router();

// GET find
router.get('/', (req, res) => {
    // DBからユーザー全件取得
    db.user.findAll({}).then((instances) => {
        // JSONデータに整形
        const json_data = instances.map((item) => {
            return {
                id: item.dataValues.id,
                username: item.dataValues.username
            }
        });
        res.json({status: "OK", data: json_data});
    });
});

// GET find :id
router.get('/:id', (req, res) => {
    // 受け取ったパラメータを元にDBからユーザー検索
    db.user.findById(req.params.id).then((instances) => {
        // ユーザーデータが存在すればデータ返却、なければStatus:NG
        if(instances){
            // JSONデータに整形
            const json_data = {
                id: instances.dataValues.id,
                username: instances.dataValues.username
            };
            res.json({status: "OK", data: json_data});
        }else{
            res.json({status: "NG"});
        }
    });
});

// POST insert data
router.post('/', (req, res) => {
    const { username, password } = req.body;
    // ユーザー名、パスワードがパラメータになければStatus:NG
    if(username && password){
        // パラメータのユーザー名、パスワードからユーザー作成
        // パスワードはハッシュ化して保存
        const param = {
            username: username,
            password: convertHash(password)
        }

        db.user.create(param).then((instances) => {
            // データが保存できればStatus:OK
            if(instances){
                // JSONデータに整形
                const json_data = {
                    id: instances.dataValues.id,
                    username: instances.dataValues.username
                };
                res.json({status: "OK", data: json_data});
            }else{
                res.json({status: "NG"});
            }
        });
    }else{
        res.json({status: "NG"});
    }
});

// PUT update data
router.put('/:id', (req, res) => {
    const { username, password } = req.body;
    // ユーザー名、パスワードがパラメータになければStatus:NG
    if(username && password){
        // パラメータのユーザー名、パスワードからユーザー作成
        // パスワードはハッシュ化して保存
        const param = {
            username: username,
            password: convertHash(password)
        }
        // 対象IDのデータを検索するSelector
        const selector = {
          where: { id: req.params.id }
        };

        db.user.update(param, selector).then((instances) => {
            // データが保存できればStatus:OK
            res.json({status: "OK"});
        });
    }else{
        res.json({status: "NG"});
    }
});

// DELETE remove data
router.delete('/:id', (req, res) => {
    // 対象IDのデータを検索するSelector
    const selector = {
      where: { id: req.params.id }
    };

    db.user.destroy(selector).then((instances) => {
        // データが削除できればStatus:OK
        res.json({status: "OK"});
    });
});

export { router as UserRouter };
