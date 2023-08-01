import { Sequelize } from 'sequelize-typescript';

/*
const connection = new Sequelize({
  dialect: 'mysql',
  host: 'db',
  username: 'root',
  password: '123456',
  database: 'lojavirtual',
  logging: false,
});
 */

const connection = new Sequelize({
  dialect: 'mysql',
  // host: process.env.NODE_ENV !== 'test' ? 'db' : 'localhost',
  host: 'localhost',
  // port: process.env.NODE_ENV !== 'test' ? 3306 : 3321,
  port: 3321,
  username: 'root',
  password: '123456',
  database:
    // process.env.NODE_ENV !== 'test' ? 'lojavirtual' : 'lojavirtual_test',
    'lojavirtual_test',
  logging: false,
});

export default connection;
