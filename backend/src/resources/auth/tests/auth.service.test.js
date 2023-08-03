import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';
import { TiposUsuarios } from '../../tipoUsuario/tipoUsuario.constants';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
}

describe('Auth Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /** 3. Implementar 1 teste de integração para a camada de serviço de auth,
         verificando a rota POST /signup - 2,5 pontos
   */
  it('should sign up user', async () => {
    //Criado para evitar repetição de inserções de 1 mesmo email no BD, o que violaria a restrição UNIQUE
    const valorRandomico = getRandomIntInclusive(1, 100000);
    const usuario = {
      nome: `Jeison Pereira de Oliveira`,
      email: `jeison.oliveira${valorRandomico}@icomp.ufam.edu.br`,
      senha: '123456',
    };

    const res = await request(server.server).post('/v1/signup').send(usuario);

    /** 
    /** 
     * O usuário cadastrado na minha base de teste possui a característica abaixo:
    {
      "id": "5a8230b0-318f-11ee-a356-5bb8bdc49af6",
      "nome": "Jeison Pereira de Oliveira",
      "email": "jeison.oliveira${valorRandomico}@icomp.ufam.edu.br",
      "tipoUsuarioId": "6a4cda94-fbb6-476b-be29-f4124cae9058",
      "updatedAt": "2023-08-02T23:50:26.363Z",
      "createdAt": "2023-08-02T23:50:26.363Z"
    }
    
      por isso os testes ficariam assim:
    **/

    console.log('Código do Status: ', res.statusCode);
    expect(res.statusCode).toEqual(201);

    console.log('Corpo da Resposta: ', res.body);
    expect(res.body.nome).toEqual(usuario.nome);
    expect(res.body.email).toEqual(usuario.email);
    expect(res.body.tipoUsuarioId).toEqual(TiposUsuarios.CLIENT);
  });

  /** 4. Implementar 1 teste de integração a mais qualquer, de sua preferência - 2,5 pontos
           a. Para esse teste a mais, podem ser testadas qualquer das rotas
           existentes no projeto, mesmo que retorne erro, pois testes
           também servem para verificar se erros estão sendo retornados
           corretamente. Exemplo: pode-se criar um teste para adicionar
           um novo produto e verificar (expect) se o retorno é "não
           autorizado".
   * Teste que verifica se está retornando a mensagem de erro: "Já existe usuário com o email informado."
   * e status 400 em caso de inserção de usuário com e-mail repetido
   */
  it('should return error message when email is retried', async () => {
    const resUE = await request(server.server).get('/v1/usuario');

    const usuarioEmailExistente = {
      nome: 'Jeison da Silva Sauro',
      email: resUE.body[0].email, //passa um e-mail que já existe
      senha: '123456',
    };

    const res = await request(server.server)
      .post('/v1/signup')
      .send(usuarioEmailExistente);

    /** 
    /** 
     * Quando um e-mail já está cadastrado para outro usuário na base, o retorno possui a característica abaixo:
    { msg: 'Já existe usuário com o email informado.' }
    
      por isso os testes ficariam assim:
    **/

    console.log('Código do Status: ', res.statusCode);
    expect(res.statusCode).toEqual(400);

    console.log('Corpo da Resposta: ', res.body);
    expect(res.body.msg).toEqual('Já existe usuário com o email informado.');
  });

  afterAll(async () => {
    await connection.close();
  });
});
