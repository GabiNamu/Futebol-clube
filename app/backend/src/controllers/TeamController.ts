import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

async function getAll(req: Request, res: Response) {
  const users = await TeamService.getAll();
  return res.status(200).json(users);
}

export default {
  getAll,
};
