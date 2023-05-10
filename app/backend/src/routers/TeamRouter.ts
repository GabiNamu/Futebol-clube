import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
teamRouter.get('/', TeamController.getAll);

export default teamRouter;
