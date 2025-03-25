'use strict';

import process from "process";

import path from "path";

import fs from "fs";

import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { User } from "../auth/entities/user.entity";

const basename = path.basename(__filename);
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

dotenv.config(); // Load environment variables

const config = {
  use_env_variable: process.env.DB_URL, // Use DB_URL from .env.development.development file
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  models: [User], // Add your models here
};

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable, {
    dialect: config.dialect,
    models: config.models,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    models: config.models,
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
