'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connection = undefined;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = exports.connection = _mysql2.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ExpressTestDB'
});