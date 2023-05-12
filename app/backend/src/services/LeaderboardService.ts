import { MatcheAtributes } from '../database/models/MatcheModel';
import MatcheService from './MatcheService';
import TeamService from './TeamService';

export default class LeaderboardService {
  public static async getAll() {
    const allTeams = await TeamService.getAll();

    return Promise.all(allTeams.map(async (team) => {
      const matches = await MatcheService.getById(team.id);
      return {
        name: team.teamName,
        totalPoints: this.getTotalPoints(matches),
        totalGames: matches.length,
        totalVictories: this.getTotalVictories(matches),
        totalDraws: this.getTotalDraws(matches),
        totalLosses: this.getTotalLosses(matches),
        goalsFavor: this.getGoalsFavor(matches),
        goalsOwn: this.getGoalsOwn(matches),
      };
    }));
  }

  public static getTotalPoints(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => (el.homeTeamGoals < el.awayTeamGoals
      ? acc + 0 : acc + el.homeTeamGoals), 0);
    // const result = (this.getTotalVictories(matches) * 3) + this.getTotalDraws(matches);
    return result;
  }

  public static getTotalVictories(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => (el.homeTeamGoals < el.awayTeamGoals
      ? acc + 0 : acc + 1), 0);
    return result;
  }

  public static getTotalDraws(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => (el.homeTeamGoals === el.awayTeamGoals
      ? acc + 1 : acc + 0), 0);
    return result;
  }

  public static getTotalLosses(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => (el.homeTeamGoals < el.awayTeamGoals
      ? acc + 1 : acc + 0), 0);
    return result;
  }

  public static getGoalsFavor(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => acc + el.homeTeamGoals, 0);
    return result;
  }

  public static getGoalsOwn(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => (acc + el.awayTeamGoals), 0);
    return result;
  }
}
