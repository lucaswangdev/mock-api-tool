const winston       = require('winston');
const winstonDaily  = require('winston-daily-rotate-file');
const path = require('path');

/**
 * LOG_DIR
 */
const LOG_DIR = path.join(__dirname, '..', '..', process.env.LOG_DIRECTORY || 'logs');


const { combine, timestamp, printf } = winston.format;

const logFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

/**
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const Logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // info 
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIR,
      filename: `%DATE%.log`,
      maxFiles: 30,  // 30 天日志文件存储
      zippedArchive: true,
    }),
    // 设置文件存储错误级别日志
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIR,
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// 在非生产环境（dev 等）的情况下
if (process.env.NODE_ENV !== 'production') {
  Logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),   /** 着色输出 */
      winston.format.simple(),     /** `${info.level}: ${info.message} JSON.stringify({ ...rest })` 格式输出 */
    )
  }));
}

module.exports = Logger;
