import fs from 'fs';
import path from 'path';
import { todayString } from './date';

const dirPath = path.join(__dirname, `../../logs/`);
export const createStream = (): fs.WriteStream => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, `../../logs/${todayString()}.log`),
    {
      flags: 'a',
    },
  );
  return accessLogStream;
};
