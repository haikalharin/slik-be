import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

const config = {
  use_env_variable: process.env.DB_URL,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT, // Convert port to number
  dialect: 'mysql',
  models: [__dirname + '/models'], // Path to your models directory
};

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable, {
    dialect: config.dialect as any,
    models: config.models,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect as any,
    models: config.models,
  });
}

export { sequelize };
