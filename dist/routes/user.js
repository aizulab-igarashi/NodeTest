'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

var _convert_hash = require('../utils/convert_hash.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// GET find
router.get('/', function (req, res) {
    // DBからユーザー全件取得
    _index2.default.user.findAll({}).then(function (instances) {
        // JSONデータに整形
        var json_data = instances.map(function (item) {
            return {
                id: item.dataValues.id,
                username: item.dataValues.username
            };
        });
        res.json({ status: "OK", data: json_data });
    });
});

// GET find :id
router.get('/:id', function (req, res) {
    // 受け取ったパラメータを元にDBからユーザー検索
    _index2.default.user.findById(req.params.id).then(function (instances) {
        // ユーザーデータが存在すればデータ返却、なければStatus:NG
        if (instances) {
            // JSONデータに整形
            var json_data = {
                id: instances.dataValues.id,
                username: instances.dataValues.username
            };
            res.json({ status: "OK", data: json_data });
        } else {
            res.json({ status: "NG" });
        }
    });
});

// POST insert data
router.post('/', function (req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;
    // ユーザー名、パスワードがパラメータになければStatus:NG

    if (username && password) {
        // パラメータのユーザー名、パスワードからユーザー作成
        // パスワードはハッシュ化して保存
        var param = {
            username: username,
            password: (0, _convert_hash.convertHash)(password)
        };

        _index2.default.user.create(param).then(function (instances) {
            // データが保存できればStatus:OK
            if (instances) {
                // JSONデータに整形
                var json_data = {
                    id: instances.dataValues.id,
                    username: instances.dataValues.username
                };
                res.json({ status: "OK", data: json_data });
            } else {
                res.json({ status: "NG" });
            }
        });
    } else {
        res.json({ status: "NG" });
    }
});

// PUT update data
router.put('/:id', function (req, res) {
    var _req$body2 = req.body,
        username = _req$body2.username,
        password = _req$body2.password;
    // ユーザー名、パスワードがパラメータになければStatus:NG

    if (username && password) {
        // パラメータのユーザー名、パスワードからユーザー作成
        // パスワードはハッシュ化して保存
        var param = {
            username: username,
            password: (0, _convert_hash.convertHash)(password)
            // 対象IDのデータを検索するSelector
        };var selector = {
            where: { id: req.params.id }
        };

        _index2.default.user.update(param, selector).then(function (instances) {
            // データが保存できればStatus:OK
            res.json({ status: "OK" });
        });
    } else {
        res.json({ status: "NG" });
    }
});

// DELETE remove data
router.delete('/:id', function (req, res) {
    // 対象IDのデータを検索するSelector
    var selector = {
        where: { id: req.params.id }
    };

    _index2.default.user.destroy(selector).then(function (instances) {
        // データが削除できればStatus:OK
        res.json({ status: "OK" });
    });
});

exports.UserRouter = router;