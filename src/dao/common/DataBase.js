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
  const connection = await pool.getConnection(async conn => conn);
  return connection;
}

module.exports = getPoolConnection;