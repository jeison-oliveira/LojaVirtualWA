import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('tipoUsuario Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**  implementar - 2,5
   */
  it.skip('should get all user types', async () => {
    const res = await request(server.server).get('/v1/tipo-usuario');
    console.log(res.status);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    /** 
    no caso do meu teste e banco de dados local,
    o produto cadastrado possui essas caracteristicas abaixo:

    [
      {
        "id": "6a4cda94-fbb6-476b-be29-f4124cae9058",
        "rotulo": "cliente",
        "createdAt": "2023-08-01T20:43:24.000Z",
        "updatedAt": "2023-08-01T20:43:24.000Z"
      },
      {
        "id": "7edd25c6-c89e-4c06-ae50-c3c32d71b8ad",
        "rotulo": "admin",
        "createdAt": "2023-08-01T20:43:24.000Z",
        "updatedAt": "2023-08-01T20:43:24.000Z"
      }
    ]
    
    por isso o teste ficaria assim:
    **/

    expect(res.body[0].rotulo).toEqual('cliente');
  });

  afterAll(async () => {
    await connection.close();
  });
});
