/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { logMiddleware } from './middleware/logMiddleware';
import { dbCreateConnection } from './utils/db';
import { createStream } from './utils/morganLogger';
import { Server } from 'socket.io';
import http from 'http';
import 'reflect-metadata';
import { socket } from './chat/chat';
import { apiCacheMiddleware } from './middleware/apicacheMiddleware';

const app: Application = express();

app.set('host_port', 4120);
app.set('host', '0.0.0.0');
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(apiCacheMiddleware());
app.use(cookieParser());
app.use(logMiddleware());

app.use(morgan('combined', { stream: createStream() }));
app.use(morgan('dev'));

app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    requestIP: req.ip,
    date: new Date().toString(),
    status: 'Alive',
  });
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

httpServer.listen(app.get('host_port'), app.get('host'), async () => {
  await dbCreateConnection();
  console.log(`✅  Server listening on port: ${app.get('host_port')}`);

  socket({ io });
});
