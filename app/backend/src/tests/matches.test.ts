import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatcheModel, { MatcheAtributes } from '../database/models/MatcheModel';
import { MatchReturnAtributes } from './mocks';

import { Response } from 'superagent';
import mocks from './mocks';
import jwtConfig from '../utils/jwtConfig';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Router', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('GET /matches', () => {
    let chaiHttpResponse: Response;
    it('Deve retornar 200 e os times', async () => {
      sinon.stub(MatcheModel, 'findAll').resolves(
        [mocks.mockmatches] as MatcheModel[])

      chaiHttpResponse = await chai.request(app)
          .get('/matches');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal([mocks.mockmatches]);
    });

    it('Deve retornar 200 e os times in progress', async () => {
      sinon.stub(MatcheModel, 'findAll').resolves(
        [mocks.mockmatchesInProgress] as MatcheModel[])

      chaiHttpResponse = await chai.request(app)
          .get('/matches?inProgress=true');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal([mocks.mockmatchesInProgress]);
    });
  });

  describe('POST /matches', () => {
    let chaiHttpResponse: Response;
    it('Deve retornar 201 e o Match criado', async () => {
      sinon.stub(jwtConfig, 'verify').returns({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });
      sinon.stub(MatcheModel, 'create').resolves(mocks.mockmatchesInProgress as MatcheModel);

      chaiHttpResponse = await chai.request(app)
          .post('/matches')
          .send(mocks.mockmatchesInProgress)
          .set('Authorization', 'token-valid');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockmatchesInProgress);
    });

    it('Deve retornar 201 e o Match criado', async () => {
      sinon.stub(jwtConfig, 'verify').returns({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });

      chaiHttpResponse = await chai.request(app)
          .post('/matches')
          .send(mocks.wrongMockmatches)
          .set('Authorization', 'token-valid');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(422);
        expect(chaiHttpResponse.body).to.be.deep.equal({ 
          message: 'It is not possible to create a match with two equal teams' 
        });
    });

    it('Deve retornar 201 e o Match criado', async () => {
      sinon.stub(jwtConfig, 'verify').returns({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });

      chaiHttpResponse = await chai.request(app)
          .post('/matches')
          .send(mocks.notExistMockmatches)
          .set('Authorization', 'token-valid');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body).to.be.deep.equal({ 
          message: 'There is no team with such id!' 
        });
    });
  });

  describe('PATCH /matches/:id/finish', () => {
    let chaiHttpResponse: Response;
    it('Deve retornar 201 e o Match criado', async () => {
      sinon.stub(jwtConfig, 'verify').returns({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });

      chaiHttpResponse = await chai.request(app)
          .patch('/matches/1/finish')
          .set('Authorization', 'token-valid');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(200);
        // expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockmatchesInProgress);
    });
  });

  describe('PATCH /matches/:id', () => {
    let chaiHttpResponse: Response;
    it('Deve retornar 201 e o Match criado', async () => {
      sinon.stub(jwtConfig, 'verify').returns({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });

      chaiHttpResponse = await chai.request(app)
          .patch('/matches/1')
          .send({homeTimeGoals: 10, awayTeamGoals: 2})
          .set('Authorization', 'token-valid');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(200);
        // expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockmatchesInProgress);
    });
  });
});