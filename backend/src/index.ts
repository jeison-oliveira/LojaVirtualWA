import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import { api } from './api-info';
import { Api } from './server';

dotenv.config();
validateEnv();
export const server = new Api();

try {
  server.bootstrap().then(() => {
    //console.info(`API Empresa rodando em modo '${api.ambiente}' na porta ${api.defaultPort}`);
  });
} catch (error) {
  //console.error('Server failed to start.');
  //console.error(error);
  process.exit(1);
}
