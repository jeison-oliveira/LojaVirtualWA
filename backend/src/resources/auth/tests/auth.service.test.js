import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Auth Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**  implementar - 2,5
   */
  it('should sign up user', async () => {
    const dados = {
      nome: 'Jeison2 Pereira de Oliveira',
      email: 'jeison2.po09@gmail.com',
      senha: 123456,
    };

    const res = await request(server.server).post('/v1/signup').send(dados);

    // console.log(res.status);
    // console.log(res.body);

    /**
     * Retorno: 
     * {
          "id": "9780b930-30ba-11ee-93e7-7b3ac5b06029",
          "nome": "Jeison Pereira de Oliveira",
          "email": "jeison2.po09@gmail.com",
          "tipoUsuarioId": "6a4cda94-fbb6-476b-be29-f4124cae9058",
          "updatedAt": "2023-08-01T22:27:25.892Z",
          "createdAt": "2023-08-01T22:27:25.892Z"
        }
     */

    expect(res.statusCode).toEqual(201);
    expect(res.body.tipoUsuarioId).toEqual(
      '6a4cda94-fbb6-476b-be29-f4124cae9058',
    );
    expect(res.body.nome).toEqual('nome');
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
