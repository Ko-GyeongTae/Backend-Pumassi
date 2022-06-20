import { Server, Socket } from 'socket.io';
import logger from '../utils/winstonLogger';

const EVENTS = {
  CONNECTION: 'connection',
  CLIENT: {
    CREATE_ROOM: 'CREATE_ROOM',
    SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
    JOIN_ROOM: 'JOIN_ROOM',
  },
  SERVER: {
    JOINED_ROOM: 'JOINED_ROOM',
    ROOM_MESSAGE: 'ROOM_MESSAGE',
  },
};

export function socket({ io }: { io: Server }) {
  console.log(`✅  Sockets enabled`);

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);
    /*
     * When a user sends a room message
     */

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();
        console.log(roomId, message, username);
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      },
    );

    /*
     * When a user joins a room
     */
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      console.log(roomId);

      socket.to(roomId).emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
  });
}
