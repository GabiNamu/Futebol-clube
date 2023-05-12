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
        goalsBalance: this.getGoalsBalance(matches),
        efficiency: this.getEfficiency(matches),
      };
    }));
  }

  public static getTotalPoints(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => {
      if (el.homeTeamGoals < el.awayTeamGoals) {
        return acc;
      }
      if (el.homeTeamGoals > el.awayTeamGoals) {
        const points = acc + 3;
        return points;
      }
      return acc + 1;
    }, 0);
    return result;
  }

  public static getTotalVictories(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => (el.homeTeamGoals > el.awayTeamGoals
      ? acc + 1 : acc), 0);
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

  public static getGoalsBalance(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => acc + (el.homeTeamGoals - el.awayTeamGoals), 0);
    return result;
  }

  public static getEfficiency(matches: MatcheAtributes[]) {
    const totalPoints = this.getTotalPoints(matches);
    const totalGames = matches.length;
    const result = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return result;
  }

  public static async sort() {
    const m = await this.getAll();
    m.sort((b, a) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return a.goalsFavor - b.goalsFavor;
          }
          return a.goalsBalance - b.goalsBalance;
        }
        return a.totalVictories - b.totalVictories;
      }
      return a.totalPoints - b.totalPoints;
    }); return m;
  }
}
