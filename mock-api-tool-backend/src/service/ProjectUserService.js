const ProjectUserMapper = require("../dao/mapper/ProjectUserMapper");
const Logger = require("../utils/logger");

/**
 * insert
 */
const insert = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(ProjectUserMapper.insert, params);
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
 * deleteProjectUser
 */
const deleteProjectUser = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(ProjectUserMapper.delete, params);
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
  deleteProjectUser,
};