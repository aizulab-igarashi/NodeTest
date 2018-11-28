'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router();

// GET find
router.get('/', function (req, res) {
    res.json({
        message: "API A"
    });
});

// GET find :id
router.get('/:id', function (req, res) {
    res.json({
        message: "API A"
    });
});

// POST insert data
router.post('/', function (req, res) {
    res.json({
        message: "API A"
    });
});

// PUT update data
router.put('/:id', function (req, res) {
    res.json({
        message: "API A"
    });
});

// DELETE remove data
router.delete('/:id', function (req, res) {
    res.json({
        message: "API A"
    });
});