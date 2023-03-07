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

module.exports = {
  port: 4000, // 服务启动的端口号
  mysqlConfig, // mysql 配置
  secret: 'jwt_json'
}