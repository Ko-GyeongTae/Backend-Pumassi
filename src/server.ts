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
import * as uuid from 'uuid';
import http from 'http';
import 'reflect-metadata';

const app: Application = express();

app.set('port', 4120);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logMiddleware());

app.use(morgan('combined', { stream: createStream() }));
app.use(morgan('dev'));

app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    requestIP: req.ip,
    uuid: uuid.v4().toString(),
    status: 'Alive',
  });
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  path: '/chat',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: true,
});

const room = ['room1', 'room2', 'room3'];
let a = 0;

io.on('connection', (socket) => {
  socket.emit('pong', 'a user connected');

  socket.on('ping', (msg) => {
    console.log(msg);
    socket.emit('pong', {
      msg: socket['user'],
    });
  });

  socket.on('joinRoom', async (num: number, name) => {
    await socket.join(room[num]);
    console.log(name + ' join a ' + room[num]);
    io.to(room[num]).emit('joinRoom', num, name);
  });

  socket.on('leaveRoom', (num: number, name) => {
    socket.leave(room[num]);
    console.log(name + ' leave a ' + room[num]);
    io.to(room[num]).emit('leaveRoom', num, name);
  });

  socket.on('chat message', (num, name, msg) => {
    a = num;
    io.to(room[a]).emit('chat message', name, msg);
  });

  socket.on('error', (err) => {
    socket.emit('pong', { msg: err.message });
  });
});

httpServer.listen(app.get('port'), async () => {
  await dbCreateConnection();
  console.log(`✅  Server listening on port: ${app.get('port')}`);
});
