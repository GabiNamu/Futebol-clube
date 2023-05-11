import Team from '../database/models/TeamModel';
import MatcheModel, { MatcheAtributes } from '../database/models/MatcheModel';

export default class MatcheService {
  public static async getAll(): Promise<MatcheAtributes[]> {
    const allMatches = await MatcheModel.findAll({ include: [{
      model: Team,
      as: 'homeTeam',
      attributes: { exclude: ['id'] } }, {
      model: Team,
      as: 'awayTeam',
      attributes: { exclude: ['id'] } }] });
    return allMatches;
  }
}
