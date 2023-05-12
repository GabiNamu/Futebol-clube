import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatcheModel, { MatcheAtributes } from '../database/models/MatcheModel';
import { MatchReturnAtributes } from './mocks';

import { Response } from 'superagent';
import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Router', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('GET /matches', () => {
    let chaiHttpResponse: Response;
    it('Deve retornar 200 e os times', async () => {
      sinon.stub(MatcheModel, 'findAll').resolves(
        [mocks.mockmatches] as MatchReturnAtributes[])

      chaiHttpResponse = await chai.request(app)
          .get('/teams');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal([
          {
            id: 1,
            teamName: "Avaí/Kindermann"
          },
        ]);
    });
  });
});