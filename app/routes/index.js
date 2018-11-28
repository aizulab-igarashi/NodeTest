import express from 'express';
import { authRouter } from '../auth.js';
import { UserRouter } from './user.js';
import { LoginRouter } from './login.js';

// Expressルーター作成
export const router = express.Router();

// Expressルーターに認証機能追加
authRouter(router);

// API読み込み
router.use('/login', LoginRouter);
router.use('/user', UserRouter);
