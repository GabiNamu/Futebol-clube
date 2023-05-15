import MatcheModel from '../database/models/MatcheModel';

interface MatchReturnAtributes {
    id: number;
    homeTeamId: number;
    homeTeamGoals: number;
    awayTeamId: number;
    awayTeamGoals: number;
    inProgress: boolean;
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

const wrongMockmatches = {
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 1,
  "awayTeamId": 1,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as MatchReturnAtributes;

const notExistMockmatches = {
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 1,
  "awayTeamId": 99,
  "awayTeamGoals": 4,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as MatchReturnAtributes;

const mockmatchesInProgress = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as MatchReturnAtributes;


const mockmatchesLeaderboard = [{
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 5,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
}];

const mockmatchesLeaderboardAway = [{
  "id": 1,
  "homeTeamId": 8,
  "homeTeamGoals": 5,
  "awayTeamId": 1,
  "awayTeamGoals": 1,
  "inProgress": false,
}];

const teamMock = [ 
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
]

// const mockleaderboard {
//   "name": "Santos",
//   "totalPoints": 9,
//   "totalGames": 3,
//   "totalVictories": 3,
//   "totalDraws": 0,
//   "totalLosses": 0,
//   "goalsFavor": 9,
//   "goalsOwn": 3,
//   "goalsBalance": 6,
//   "efficiency": "100.00"
// }

export default {
    mockmatches,
    mockmatchesInProgress,
    wrongMockmatches,
    notExistMockmatches,
    teamMock,
    mockmatchesLeaderboard,
    mockmatchesLeaderboardAway
}

export {MatchReturnAtributes,}