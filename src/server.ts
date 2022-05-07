import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { logMiddleware } from './middleware/logMiddleware';
import { dbCreateConnection } from './utils/db';
import { createStream } from './utils/morganLogger';

const bootstrap = async () => {
  const app: Application = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(logMiddleware());
  app.use(morgan('combined', { stream: createStream() }));

  app.use(morgan('dev'));

  await dbCreateConnection();
  app.use('/', routes);

  app.listen(4120, () => {
    console.log('✅  Server listening on port: 4120');
  });
};
bootstrap();
