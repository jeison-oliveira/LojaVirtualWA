import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('tipoUsuario Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /** 2. Implementar 1 teste de integração para a camada de serviço de
         tipoUsuario, verificando a rota GET /tipo-usuario - 2,5 pontos
   */
  it('should get all user types', async () => {
    const res = await request(server.server).get('/v1/tipo-usuario');

    /** 
    /** 
     * Os tipos de usuários cadastrados na minha base de teste possuem as características abaixo:
    [
      {
        "id": "6a4cda94-fbb6-476b-be29-f4124cae9058",
        "rotulo": "cliente",
        "createdAt": "2023-08-01T03:15:31.000Z",
        "updatedAt": "2023-08-01T03:15:31.000Z"
      },
      {
        "id": "7edd25c6-c89e-4c06-ae50-c3c32d71b8ad",
        "rotulo": "admin",
        "createdAt": "2023-08-01T03:15:31.000Z",
        "updatedAt": "2023-08-01T03:15:31.000Z"
      }
    ]
    
      por isso os testes ficariam assim:
    **/

    console.log('Código do Status: ', res.statusCode);
    expect(res.statusCode).toEqual(200);

    console.log('Corpo da Resposta: ', res.body);
    expect(res.body[0].id).toEqual('6a4cda94-fbb6-476b-be29-f4124cae9058');
    expect(res.body[0].rotulo).toEqual('cliente');

    expect(res.body[1].id).toEqual('7edd25c6-c89e-4c06-ae50-c3c32d71b8ad');
    expect(res.body[1].rotulo).toEqual('admin');

    console.log('Tamanho do Array: ', res.body.length);
    expect(res.body.length).toEqual(2);
  });

  afterAll(async () => {
    await connection.close();
  });
});
