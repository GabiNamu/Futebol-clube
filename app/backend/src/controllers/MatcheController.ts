import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const matches = await MatcheService.getAllInProgress(inProgress);
      return res.status(200).json(matches);
    }
    const matches = await MatcheService.getAll();
    return res.status(200).json(matches);
  }

  public static async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const finished = await MatcheService.updateInProgress(Number(id));
    return res.status(200).json(finished);
  }

  public static async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const finished = await MatcheService.updateGoals(
      Number(id),
      { homeTeamGoals, awayTeamGoals },
    );
    return res.status(200).json(finished);
  }

  public static async create(req: Request, res: Response) {
    const newMatche = await MatcheService.create(req.body);
    return res.status(201).json(newMatche);
  }
}
