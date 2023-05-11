import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middlewares/validateLogin';
import authMiddleware from '../middlewares/auth';

const loginRouter = Router();
loginRouter.post(
  '/',
  (req, res, next) => validateLogin(req, res, next),
  (req, res) => LoginController.login(req, res),
);
loginRouter.get(
  '/role',
  (req, res, next) => authMiddleware(req, res, next),
  (req, res) => LoginController.loginRole(req, res),
);

export default loginRouter;
