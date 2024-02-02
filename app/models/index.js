import dbConfig from "../config/db.config.js";

import Sequelize from "sequelize";

import { user } from "./user.model.js";
import { blog } from "./blog.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize, Sequelize);
db.blog = blog(sequelize, Sequelize);

export default db;
