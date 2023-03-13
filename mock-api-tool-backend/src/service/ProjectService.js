const ProjectMapper = require("../dao/mapper/ProjectMapper");
const Logger = require("../utils/logger");

/**
 * insert
 */
const insert = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(ProjectMapper.insert, params);
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
    const statement = ctxData.outputSQL(ProjectMapper.update, params);
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
 * findAllByUserId
 */
const findAllByUserId = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(ProjectMapper.findAllByUserId, params);
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
    const statement = ctxData.outputSQL(ProjectMapper.delete, params);
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
  deleteApi,
  findAllByUserId,
};