import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel, { TeamAtributes } from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';

import { Response } from 'superagent';
import jwtConfig from '../utils/jwtConfig';
import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Router', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('GET /Leaderboard/home', () => {
    let chaiHttpResponse: Response;
    it('Deve retornar 201 e o Match criado', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(mocks.teamMock as TeamModel[]);
        sinon.stub(MatcheModel, 'findAll').resolves(mocks.mockmatchesLeaderboard as MatcheModel[]);
  
        chaiHttpResponse = await chai.request(app)
            .get('/leaderboard/home')
  
          // assert => espero um resultado
          expect(chaiHttpResponse.status).to.be.equal(200);
        //   expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockmatchesInProgress);
      });
  })

  describe('GET /Leaderboard/away', () => {
    let chaiHttpResponse: Response;
    it('Deve retornar 201 e o Match criado', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(mocks.teamMock as TeamModel[]);
        sinon.stub(MatcheModel, 'findAll').resolves(mocks.mockmatchesLeaderboardAway as MatcheModel[]);
  
        chaiHttpResponse = await chai.request(app)
            .get('/leaderboard/away')
  
          // assert => espero um resultado
          expect(chaiHttpResponse.status).to.be.equal(200);
        //   expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockmatchesInProgress);
      });
  })
});