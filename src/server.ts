import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import logger from './utils/logger';
import { logMiddleware } from './utils/logMiddleware';
import { dbCreateConnection } from './utils/db';

const bootstrap = async () => {
  const app: Application = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(logMiddleware());
  app.use('/', routes);

  try {
    const date = new Date();
    const year = date.getFullYear().toString();

    let month = (date.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;

    let day = date.getDate().toString();
    day = +day < 10 ? '0' + day : day;

    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, `../logs/${year}-${month}-${day}.log`),
      {
        flags: 'a',
      },
    );
    app.use(morgan('combined', { stream: accessLogStream }));
  } catch (err) {
    console.log(err);
  }

  dbCreateConnection();

  app.listen(4120, () => {
    logger.info('✅  Server listening on port: 4120');
  });
};
bootstrap();
