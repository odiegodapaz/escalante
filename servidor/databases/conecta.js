<<<<<<< HEAD
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "escalante", "root", "123", { //criar banco de dados no heide depois
  dialect: "mysql",
  host: "localhost",
  port: 3306
=======
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "escalante", "root", "123", { //criar banco de dados no heide depois
  dialect: "mysql",
  host: "localhost",
  port: 3306
>>>>>>> fc98836a3c67ae9cdc8bac0a20c712332d782084
});