import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
teamRouter.get('/', TeamController.getAll);
teamRouter.get('/:id', TeamController.getById);

export default teamRouter;
