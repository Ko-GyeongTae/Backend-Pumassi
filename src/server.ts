import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { logger } from './utils/logger';
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  logger.info('로그 출력 test용 middleware');

  logger.error('error 메시지');
  logger.warn('warn 메시지');
  logger.info('info 메시지');
  logger.http('http 메시지');
  logger.debug('debug 메시지');

  next();
});

app.use('/', routes);

const MySQLDataSource = new DataSource({
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
    console.log('Connect to MySQL successfully!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.listen(4120, () => {
  console.log(`
######################################
🛡️  Server listening on port: 4120  🛡️
######################################
`);
});
