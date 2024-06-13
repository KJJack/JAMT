import express from 'express';
import { userLogin } from '../controllers/authenticate.controller.js';

const LoginRouter = express.Router();

LoginRouter.post('/', userLogin);

export default LoginRouter;