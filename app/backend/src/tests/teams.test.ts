// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import TeamModel from '../database/models/TeamModel';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Teams Router', () => {
//   afterEach(() => {
//     sinon.restore();
//   });
//   describe('GET /times', () => {
//     it('Deve retornar 200 e os times', async () => {
//       sinon.stub(TeamModel, 'findAll').resolves([
//         {
//           teamName: "Avaí/Kindermann"
//         },
//       ])

//       const response = await chai.request(app)
//           .get('/teams');

//         // assert => espero um resultado
//         expect(response.status).to.be.equal(200);
//         expect(response.body).to.be.deep.equal([
//           {
//             id: 1,
//             teamName: "Avaí/Kindermann"
//           },
//         ]);
//     });
//   })
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
// });
