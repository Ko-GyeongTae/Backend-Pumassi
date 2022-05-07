import fs from 'fs';
import path from 'path';
import { todayString } from './date';

export const createStream = (): fs.WriteStream => {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, `../../logs/${todayString()}.log`),
    {
      flags: 'a',
    },
  );
  return accessLogStream;
};
