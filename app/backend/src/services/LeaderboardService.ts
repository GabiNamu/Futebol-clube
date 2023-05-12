import { MatcheAtributes } from '../database/models/MatcheModel';
import MatcheService from './MatcheService';
import TeamService from './TeamService';

export default class LeaderboardService {
  public static async getAll(value: string) {
    const allTeams = await TeamService.getAll();

    return Promise.all(allTeams.map(async (team) => {
      const matches = value === 'home' ? await MatcheService.getHomeTimeById(team.id)
        : await MatcheService.getAwayTimeById(team.id);
      return {
        name: team.teamName,
        totalPoints: value === 'home' ? this.getTotalHomePoints(matches)
          : this.getTotalAwayPoints(matches),
        totalGames: matches.length,
        totalVictories: this.getTotalVictories(matches, value),
        totalDraws: this.getTotalDraws(matches, value),
        totalLosses: this.getTotalLosses(matches, value),
        goalsFavor: this.getGoalsFavor(matches, value),
        goalsOwn: this.getGoalsOwn(matches, value),
        goalsBalance: this.getGoalsBalance(matches, value),
        efficiency: this.getEfficiency(matches, value),
      };
    }));
  }

  public static getTotalHomePoints(matches: MatcheAtributes[]) {
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

  public static getTotalAwayPoints(matches: MatcheAtributes[]) {
    const result = matches.reduce((acc, el) => {
      if (el.awayTeamGoals < el.homeTeamGoals) {
        return acc;
      }
      if (el.awayTeamGoals > el.homeTeamGoals) {
        const points = acc + 3;
        return points;
      }
      return acc + 1;
    }, 0);
    return result;
  }

  public static getTotalVictories(matches: MatcheAtributes[], someTeam: string) {
    if (someTeam === 'home') {
      const result = matches.reduce((acc, el) => (el.homeTeamGoals > el.awayTeamGoals
        ? acc + 1 : acc), 0);
      return result;
    }
    const result = matches.reduce((acc, el) => (el.awayTeamGoals > el.homeTeamGoals
      ? acc + 1 : acc), 0);
    return result;
  }

  public static getTotalDraws(matches: MatcheAtributes[], someTeam: string) {
    if (someTeam === 'home') {
      const result = matches.reduce((acc, el) => (el.homeTeamGoals === el.awayTeamGoals
        ? acc + 1 : acc + 0), 0);
      return result;
    }
    const result = matches.reduce((acc, el) => (el.awayTeamGoals === el.homeTeamGoals
      ? acc + 1 : acc + 0), 0);
    return result;
  }

  public static getTotalLosses(matches: MatcheAtributes[], someTeam: string) {
    if (someTeam === 'home') {
      const result = matches.reduce((acc, el) => (el.homeTeamGoals < el.awayTeamGoals
        ? acc + 1 : acc + 0), 0);
      return result;
    }
    const result = matches.reduce((acc, el) => (el.awayTeamGoals < el.homeTeamGoals
      ? acc + 1 : acc + 0), 0);
    return result;
  }

  public static getGoalsFavor(matches: MatcheAtributes[], someTeam: string) {
    if (someTeam === 'home') {
      const result = matches.reduce((acc, el) => acc + el.homeTeamGoals, 0);
      return result;
    }
    const result = matches.reduce((acc, el) => acc + el.awayTeamGoals, 0);
    return result;
  }

  public static getGoalsOwn(matches: MatcheAtributes[], someTeam: string) {
    if (someTeam === 'home') {
      const result = matches.reduce((acc, el) => (acc + el.awayTeamGoals), 0);
      return result;
    }
    const result = matches.reduce((acc, el) => (acc + el.homeTeamGoals), 0);
    return result;
  }

  public static getGoalsBalance(matches: MatcheAtributes[], someTeam: string) {
    if (someTeam === 'home') {
      const result = matches.reduce((acc, el) => acc + (el.homeTeamGoals - el.awayTeamGoals), 0);
      return result;
    }
    const result = matches.reduce((acc, el) => acc + (el.awayTeamGoals - el.homeTeamGoals), 0);
    return result;
  }

  public static getEfficiency(matches: MatcheAtributes[], someTeam: string) {
    let totalPoints;
    if (someTeam === 'home') {
      totalPoints = this.getTotalHomePoints(matches);
    } else {
      totalPoints = this.getTotalAwayPoints(matches);
    }
    const totalGames = matches.length;
    const result = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return result;
  }

  public static async sort(someTeam: string) {
    const m = await this.getAll(someTeam);
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
