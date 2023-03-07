const UserMapper = require("../dao/mapper/UserMapper");

/**
 * insert
 */
const insert = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(UserMapper.insert, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    // Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

/**
 * update
 */
const update = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(UserMapper.update, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    // Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

/**
 * findByUserAccount
 */
const findByUserAccount = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(UserMapper.findByUserAccount, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    // Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

/**
 * delete
 */
const deleteApi = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(UserMapper.delete, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    // Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

module.exports = {
  insert,
  update,
  deleteApi,
  findByUserAccount,
};