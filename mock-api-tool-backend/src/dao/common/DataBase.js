const mysql   = require('mysql2/promise');
const { mysqlConfig } = require('../../config/index');


/**
 *  database connection pool create
 */
let  pool = mysql.createPool(mysqlConfig);

/**
 *  database connection pool connection acquire
 */
pool.on('acquire', (connection) => {
  console.log(`Connection ${connection.threadId} acquired`);
});

/**
 *  database connection pool connection enqueue
 */
pool.on('enqueue',() => {
  console.log('Waiting for available connection slot');
});

/**
 *  database connection pool connection release
 */
pool.on('release', (connection) => {
  console.log(`Connection ${connection.threadId} released`);
});

/**
 *  database connection pool created
 */
pool.on('connection', () => {
  console.log(`Connection pool created`);
});

/**
 * get connection
 */
const getPoolConnection = async () => {
  // mysql2 v3 promise pool 的 getConnection() 不接受回调参数，直接 await 即可
  const connection = await pool.getConnection();
  return connection;
}

module.exports = getPoolConnection;