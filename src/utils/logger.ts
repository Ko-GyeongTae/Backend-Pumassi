// logger.ts
import path from 'path';
import { createLogger, transports, format } from 'winston';

const createFileName = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString();

  let month = (date.getMonth() + 1).toString();
  month = +month < 10 ? '0' + month : month;

  let day = date.getDate().toString();
  day = +day < 10 ? '0' + day : day;

  let filename = path.join(__dirname, '../../logs/');
  filename = filename + year + '-' + month + '-' + day + '.txt';

  return filename;
};

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.label({ label: '[Pumassi-Server]' }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize(),
        format.printf(
          (info: TransformableInfo) =>
            `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
        ),
      ),
    }),
    new transports.File({ filename: createFileName() }),
  ],
});

export default logger;
