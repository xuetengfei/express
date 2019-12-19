const FileStreamRotator = require('file-stream-rotator'); // 日志切割
const logger = require('morgan');
const path = require('path');

const rootPath = process.cwd();
const logDirectory = path.join(rootPath, 'run_log');

const setUpConfig = type => ({
  date_format: 'YYYYMMDD',
  frequency: 'daily',
  verbose: false,
  filename: path.join(logDirectory, `%DATE%-${type}.log`),
});
const accessLogStream = FileStreamRotator.getStream(setUpConfig('access'));
const errorLogStream = FileStreamRotator.getStream(setUpConfig('error'));

const logFormat = ':method :url :status :res[content-length] :remote-addr :response-time ms';

const accessLogger = logger(logFormat, {
  stream: accessLogStream,
});

const errorLogger = logger(logFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: errorLogStream,
});

module.exports = {
  accessLogger,
  errorLogger,
  logDirectory,
};

// [expressjs/morgan: HTTP request logger middleware for node.js](https://github.com/expressjs/morgan/#skip)
// [Node 进阶：express 默认日志组件 morgan 从入门使用到源码剖析 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1009848)
