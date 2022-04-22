import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import logger from './utils/logger';
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

export const MySQLDataSource = new DataSource({
  //MySQL 서버 연결
  type: 'mysql',
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: [
    __dirname + '/shared/entities/*.{js,ts}', //Entity 경로 설정
  ],
});

MySQLDataSource.initialize()
  .then(() => {
    logger.info('✅  Connect to MySQL successfully!');
  })
  .catch((err) => {
    logger.error('❌  Error during Data Source initialization', err);
  });

app.listen(4120, () => {
  logger.info('✅  Server listening on port: 4120');
});
