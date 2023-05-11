import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel, { UserAtributes } from '../database/models/UserModel';
import createTokenJWT from '../utils/jwtConfig';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Router', () => {
    afterEach(() => {
      sinon.restore();
    });
    describe('POST /login', () => { 
        let chaiHttpResponse: Response;
        // it('Deve retornar 200 e o token', async () => {
        //     sinon.stub(createTokenJWT, 'sign').returns('JWT');
        //     sinon.stub(UserModel, 'findOne').resolves({
        //         id: 1,
        //         username: 'admin',
        //         role: 'admin',
        //         email: 'admin@admin.com',
        //         password: "senha_admin"
        //       } as UserModel)
      
        //     chaiHttpResponse = await chai.request(app)
        //         .post('/login')
        //         .send({
        //             email: 'admin@admin.com',
        //             password: 'senha_admin'
        //         });
      
        //       // assert => espero um resultado
        //       expect(chaiHttpResponse.status).to.be.equal(200);
        //       expect(chaiHttpResponse.body).to.be.deep.equal(
        //         {token: 'JWT'}
        //       );
        //   });

          it('Deve retornar 400 e a mensagem "All fields must be filled"', async () => {
            chaiHttpResponse = await chai.request(app)
                .post('/login')
                .send({
                    password: 'senha_admin'
                });
      
              // assert => espero um resultado
              expect(chaiHttpResponse.status).to.be.equal(400);
              expect(chaiHttpResponse.body).to.be.deep.equal(
                {message: 'All fields must be filled'}
              );
          });

          it('Deve retornar 400 e a mensagem "All fields must be filled"', async () => {
            chaiHttpResponse = await chai.request(app)
                .post('/login')
                .send({
                    email: 'admin@admin.com',
                });
      
              // assert => espero um resultado
              expect(chaiHttpResponse.status).to.be.equal(400);
              expect(chaiHttpResponse.body).to.be.deep.equal(
                {message: 'All fields must be filled'}
              );
          });

          it('Deve retornar 400 e a mensagem "All fields must be filled"', async () => {
            chaiHttpResponse = await chai.request(app)
                .post('/login')
                .send({
                    email: 'admin@admin',
                    password: 'senha_admin'
                });
      
              // assert => espero um resultado
              expect(chaiHttpResponse.status).to.be.equal(401);
              expect(chaiHttpResponse.body).to.be.deep.equal(
                {message: 'Invalid email or password'}
              );
          });

          it('Deve retornar 401 e a mensagem "All fields must be filled"', async () => {
            sinon.stub(UserModel, 'findOne').resolves(undefined)
            chaiHttpResponse = await chai.request(app)
                .post('/login')
                .send({
                    email: 'dffdvd@admin.com',
                    password: 'senha_admin'
                });
      
              // assert => espero um resultado
              expect(chaiHttpResponse.status).to.be.equal(401);
              expect(chaiHttpResponse.body).to.be.deep.equal(
                {message: 'Invalid email or password'}
              );
          });

          it('Deve retornar 401 e a mensagem "All fields must be filled"', async () => {
            sinon.stub(UserModel, 'findOne').resolves({
                id: 1,
                username: 'admin',
                role: 'admin',
                email: 'admin@admin.com',
                password: "senha_admin"
              } as UserModel)
            chaiHttpResponse = await chai.request(app)
                .post('/login')
                .send({
                    email: 'admin@admin.com',
                    password: 'senha_ad'
                });
      
              // assert => espero um resultado
              expect(chaiHttpResponse.status).to.be.equal(401);
              expect(chaiHttpResponse.body).to.be.deep.equal(
                {message: 'Invalid email or password'}
              );
          });
    });
});