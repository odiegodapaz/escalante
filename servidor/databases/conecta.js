import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "escalante", "root", "123", { //criar banco de dados no heide depois
  dialect: "mysql",
  host: "localhost",
  port: 3306
});