import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Produto Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**
   * pré requisito para esse teste:
   *
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
   * */
  it('should show all products', async () => {
    const res = await request(server.server).get('/v1/produto');

    /** 
     * Os produtos cadastrados na minha base de teste possuem as características abaixo:
    [
      {
        id: '4d19bf40-301a-11ee-9f5e-817c0b5c9bca',
        nome: 'Queijo',
        preco: 719,
        estoque: 3,
        createdAt: '2023-08-01T03:20:01.000Z',
        updatedAt: '2023-08-01T03:20:01.000Z'
      },
      {
        id: 'a7f68ce0-301a-11ee-bdc6-27533b05e12c',
        nome: 'Toalhas',
        preco: 479,
        estoque: 7,
        createdAt: '2023-08-01T03:22:34.000Z',
        updatedAt: '2023-08-01T03:22:34.000Z'
      }
    ]
    
      por isso os testes ficariam assim:
    **/

    console.log('Código do Status: ', res.statusCode);
    expect(res.statusCode).toEqual(200);

    console.log('Corpo da Resposta: ', res.body);
    expect(res.body[0].nome).toEqual('Queijo');
    expect(res.body[0].preco).toEqual(719);
    expect(res.body[0].estoque).toEqual(3);

    expect(res.body[1].nome).toEqual('Toalhas');
    expect(res.body[1].preco).toEqual(479);
    expect(res.body[1].estoque).toEqual(7);

    console.log('Tamanho do Array: ', res.body.length);
    expect(res.body.length).toEqual(2);
  });

  /** 1. Implementar 1 teste de integração para a camada de serviço de
         Produto, verificando a rota GET /produto/:id - 2,5 pontos
          a. Para que esse teste funcione corretamente, será necessário
          antes cadastrar manualmente um novo produto no banco de
          dados de teste via interface do MySQL ou via API, mas caso
          seja feito por API/postman lembre-se de alterar o banco de
          dados para apontar para o BD de teste.
   *
   * pré requisito para esse teste:
   *
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
   */
  it('should get specific product', async () => {
    const res = await request(server.server).get(
      '/v1/produto/4d19bf40-301a-11ee-9f5e-817c0b5c9bca',
    );

    /** 
     * O produto cadastrado na minha base de teste possui a característica abaixo:
        {
          "id": "4d19bf40-301a-11ee-9f5e-817c0b5c9bca",
          "nome": "Queijo",
          "preco": 719,
          "estoque": 3,
          "createdAt": "2023-08-01T03:20:01.000Z",
          "updatedAt": "2023-08-01T03:20:01.000Z"
        }
    
      por isso os testes ficariam assim:
    **/

    console.log('Código do Status: ', res.statusCode);
    expect(res.statusCode).toEqual(200);

    console.log('Corpo da Resposta: ', res.body);
    expect(res.body.nome).toEqual('Queijo');
    expect(res.body.id).toEqual('4d19bf40-301a-11ee-9f5e-817c0b5c9bca');
    expect(res.body.estoque).toEqual(3);
  });

  afterAll(async () => {
    await connection.close();
  });
});
