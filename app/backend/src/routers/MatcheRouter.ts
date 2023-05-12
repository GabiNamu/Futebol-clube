import { Router } from 'express';
import MatcheController from '../controllers/MatcheController';
import authMiddleware from '../middlewares/auth';

const matcheRouter = Router();
matcheRouter.get('/', (req, res) => MatcheController.getAll(req, res));
matcheRouter.patch(
  '/:id/finish',
  (req, res, next) => authMiddleware(req, res, next),
  (req, res) => MatcheController.updateInProgress(req, res),
);

export default matcheRouter;
