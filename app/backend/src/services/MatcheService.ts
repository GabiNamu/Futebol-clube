import Team from '../database/models/TeamModel';
import MatcheModel, { MatcheAtributes } from '../database/models/MatcheModel';
import MatcheCreateAtributes from '../interfaces/MatcheCreateAtributes';
import TeamService from './TeamService';

export default class MatcheService {
  public static async getAllInProgress(inProgress: string | undefined): Promise<MatcheAtributes[]> {
    const allMatches = await MatcheModel.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } }, {
        model: Team,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } }] });
    return allMatches;
  }

  public static async getAll(): Promise<MatcheAtributes[]> {
    const allMatches = await MatcheModel.findAll({
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } }, {
        model: Team,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } }] });
    return allMatches;
  }

  public static async getHomeTimeById(id: number): Promise<MatcheAtributes[]> {
    const allMatches = await MatcheModel.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } }, {
        model: Team,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } }] });
    return allMatches;
  }

  public static async getAwayTimeById(id: number): Promise<MatcheAtributes[]> {
    const allMatches = await MatcheModel.findAll({
      where: { awayTeamId: id, inProgress: false },
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: { exclude: ['id'] } }, {
        model: Team,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } }] });
    return allMatches;
  }

  public static async updateInProgress(id: number): Promise<{ message: string }> {
    const a = await MatcheModel.update({ inProgress: false }, { where: { id } });
    console.log(a);
    return { message: 'Finished' };
  }

  public static async updateGoals(id: number, goals: {
    homeTeamGoals: number, awayTeamGoals: number }): Promise<{ message: string }> {
    await MatcheModel.update(goals, { where: { id } });
    return { message: 'updated' };
  }

  public static async create(matche: MatcheCreateAtributes): Promise<MatcheAtributes
  | string > {
    const validation = await this.validate(matche);
    if (validation.message !== 'true') {
      return validation.message;
    }
    const newMatche = await MatcheModel.create({ ...matche, inProgress: true });
    return newMatche;
  }

  public static async validate(matche: MatcheCreateAtributes): Promise<{ message: string }> {
    if (matche.homeTeamId === matche.awayTeamId) {
      return { message: 'It is not possible to create a match with two equal teams' };
    }
    const homeTeam = await TeamService.getById(matche.homeTeamId);
    const awayTeam = await TeamService.getById(matche.awayTeamId);
    if (typeof homeTeam === 'string' || typeof awayTeam === 'string') {
      return { message: 'There is no team with such id!' };
    }
    return { message: 'true' };
  }
}
