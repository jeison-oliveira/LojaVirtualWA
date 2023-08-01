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
  it.skip('should show all products', async () => {
    const res = await request(server.server).get('/v1/produto');

    console.log(res.status);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    /** 
    no caso do meu teste e banco de dados local,
    o produto cadastrado possui essas caracteristicas abaixo:

    {
      id: 'd4b51e26-26a0-11ee-8899-0242ac120004',
      nome: 'teste',
      preco: 123,
      estoque: 2,
      createdAt: '2023-07-20T01:57:22.000Z',
      updatedAt: '2023-07-20T01:57:22.000Z'
    }

    por isso o teste ficaria assim:
    
    expect(res.body.nome).toEqual("Teste");
    expect(res.body.preco).toEqual(123);
    expect(res.body.estoque).toEqual(2);

    contudo, caso voce possua mais de um produto cadastrado para teste,
    o endpoint irá retornar um array. Nesse caso, talvez seja mais interessante
    verificar se o tamanho do array retornado está de acordo com a quantidade
    de produtos existentes, por exemplo.
    **/
  });

  /**  implementar - 2,5
   *
   * pré requisito para esse teste:
   *
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
   */
  it.skip('should get specific product', async () => {
    /**
     *  [
          {
            "id": "4d19bf40-301a-11ee-9f5e-817c0b5c9bca",
            "nome": "Queijo",
            "preco": 719,
            "estoque": 3,
            "createdAt": "2023-08-01T03:20:01.000Z",
            "updatedAt": "2023-08-01T03:20:01.000Z"
          },
          {
            "id": "a7f68ce0-301a-11ee-bdc6-27533b05e12c",
            "nome": "Toalhas",
            "preco": 479,
            "estoque": 7,
            "createdAt": "2023-08-01T03:22:34.000Z",
            "updatedAt": "2023-08-01T03:22:34.000Z"
          }
        ]
     */

    const res = await request(server.server).get(
      '/v1/produto/4d19bf40-301a-11ee-9f5e-817c0b5c9bca',
    );

    console.log(res.status);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);

    /** Sempre retorna um array */
    expect(res.body).toEqual({
      id: '4d19bf40-301a-11ee-9f5e-817c0b5c9bca',
      nome: 'Queijo',
      preco: 719,
      estoque: 3,
      createdAt: '2023-08-01T03:20:01.000Z',
      updatedAt: '2023-08-01T03:20:01.000Z',
    });
  });

  afterAll(async () => {
    await connection.close();
  });
});
