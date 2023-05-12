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
matcheRouter.patch(
  '/:id',
  (req, res, next) => authMiddleware(req, res, next),
  (req, res) => MatcheController.updateGoals(req, res),
);
matcheRouter.post(
  '/',
  (req, res, next) => authMiddleware(req, res, next),
  (req, res) => MatcheController.create(req, res),
);

export default matcheRouter;
