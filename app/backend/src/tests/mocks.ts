import MatcheModel from '../database/models/MatcheModel';

interface MatchReturnAtributes {
    id: number;
    homeTeamId: number;
    homeTeamGoals: number;
    awayTeamId: number;
    awayTeamGoals: number;
    inProgress: boolean;
    homeTeam: {teamName: string};
    awayTeam: {teamName: string};
}

const mockmatches = {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
} as MatchReturnAtributes;

export default {
    mockmatches,
}

export {MatchReturnAtributes,}