import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async getAll(req: Request, res: Response) {
    const teams = await LeaderboardService.sort();
    return res.status(200).json(teams);
  }
}
