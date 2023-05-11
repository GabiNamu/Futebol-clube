import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../midlewares/validateLogin';

const loginRouter = Router();
loginRouter.post( // fg
  '/',
  (req, res, next) => validateLogin(req, res, next),
  (req, res) => LoginController.login(req, res),
);

export default loginRouter;
