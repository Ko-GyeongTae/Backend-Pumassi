import 'reflect-metadata';
import * as dotenv from 'dotenv';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();

const config: ConnectionOptions = {
  //MySQL 서버 연결
  type: 'mysql',
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: process.env.NODE_ENV != 'prod' ? true : false,
  logging: process.env.NODE_ENV != 'prod' ? true : false,
  entities: [
    __dirname + '/../shared/entities/**.{js,ts}', //Entity 경로 설정
  ],
  namingStrategy: new SnakeNamingStrategy(),
};

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    console.log(
      `✅  Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`,
    );
  } catch (err: any) {
    if (err.name === 'AlreadyHasActiveConnectionError') {
      const activeConnection = getConnectionManager().get(config.name);
      return activeConnection;
    }
    console.log(err);
  }
  return null;
};
