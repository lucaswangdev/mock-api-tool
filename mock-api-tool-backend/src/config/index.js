const fs = require('fs');

// mysql 配置
const mysqlConfig = {
  host:'127.0.0.1', // 数据库
  // port: '', // 端口号
  database: 'mock-api', // 数据库名称
  user: 'root', // 数据库用户名
  password: 'root', // 数据库密码
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // multipleStatements : true,
}

// TLS/SSL 开关（默认关闭，不影响本地开发）
// MYSQL_SSL=true                 启用 TLS
// MYSQL_SSL_REJECT_UNAUTHORIZED=false  跳过证书校验（不推荐，仅自签证书调试用）
// MYSQL_SSL_CA=/path/to/ca.pem   指定 CA 证书
if (process.env.MYSQL_SSL === 'true') {
  mysqlConfig.ssl = {
    rejectUnauthorized: process.env.MYSQL_SSL_REJECT_UNAUTHORIZED !== 'false',
  };
  if (process.env.MYSQL_SSL_CA) {
    mysqlConfig.ssl.ca = fs.readFileSync(process.env.MYSQL_SSL_CA);
  }
}

module.exports = {
  port: 4000, // 服务启动的端口号
  mysqlConfig, // mysql 配置
  secret: 'jwt_json'
}