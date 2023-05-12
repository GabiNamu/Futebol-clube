import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async getAllHome(req: Request, res: Response) {
    const teams = await LeaderboardService.sort('home');
    return res.status(200).json(teams);
  }

  public static async getAllAway(req: Request, res: Response) {
    const teams = await LeaderboardService.sort('away');
    return res.status(200).json(teams);
  }
}
