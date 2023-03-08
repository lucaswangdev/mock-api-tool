const MockMapper = require("../dao/mapper/MockMapper");
const Logger = require("../utils/logger");

/**
 * insert
 */
const insert = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(MockMapper.insert, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

/**
 * update
 */
const update = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(MockMapper.update, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

/**
 * findById
 */
const findById = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(MockMapper.findById, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

/**
 * delete
 */
const deleteApi = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(MockMapper.delete, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

/**
 * findByApiPath
 */
const findByApiPath = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(MockMapper.findByApiPath, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

/**
 * findAll
 */
const findAll = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(MockMapper.findAll, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  } catch (e) {
    Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

module.exports = {
  insert,
  update,
  findById,
  deleteApi,
  findByApiPath,
  findAll,
};