// mysql 配置
const mysqlConfig = {
  host:'127.0.0.1', // 数据库
  user: 'root', // 数据库用户名
  password: '', // 数据库密码
  database: 'mock-api', // 数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

module.exports = {
  port: 4000, // 服务启动的端口号
  mysqlConfig, // mysql 配置
}