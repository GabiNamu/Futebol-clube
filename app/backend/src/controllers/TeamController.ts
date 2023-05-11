import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  public static async getAll(req: Request, res: Response) {
    const users = await TeamService.getAll();
    return res.status(200).json(users);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const users = await TeamService.getById(Number(id));
    if (typeof users === 'string') return res.status(404).json({ message: users });
    return res.status(200).json(users);
  }
}
