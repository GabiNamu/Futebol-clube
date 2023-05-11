import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  public static async getAll(req: Request, res: Response) {
    const matches = await MatcheService.getAll();
    return res.status(200).json(matches);
  }
}
