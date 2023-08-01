import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';
import { TiposUsuarios } from '../../tipoUsuario/tipoUsuario.constants';

describe('Usuario Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  it.skip('should create new user', async () => {
    const randomEmailNumber = Math.random().toFixed(10);

    const res = await request(server.server)
      .post('/v1/usuario')
      .send({
        nome: 'Web teste',
        email: `web.teste${randomEmailNumber}@gmail.com`, //web.teste.044554
        tipoUsuarioId: '7edd25c6-c89e-4c06-ae50-c3c32d71b8ad',
        senha: '12345678',
      });

    console.log('conteudo de res.body:', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toEqual('Web teste');
    expect(res.body.email).toEqual(`web.teste${randomEmailNumber}@gmail.com`);
    expect(res.body.tipoUsuarioId).toEqual(TiposUsuarios.ADMIN);
  });

  afterAll(async () => {
    await connection.close();
  });
});
