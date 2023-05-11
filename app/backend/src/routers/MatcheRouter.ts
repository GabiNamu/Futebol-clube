import { Router } from 'express';
import MatcheController from '../controllers/MatcheController';

const matcheRouter = Router();
matcheRouter.get('/', (req, res) => MatcheController.getAll(req, res));

export default matcheRouter;
