const UserMapper = require("../dao/mapper/UserMapper");

/**
 * userQuery
 */
const userQuery = async (ctxData, params) => {
  try {
    const statement = ctxData.outputSQL(UserMapper.userQuery, params);
    const connection = ctxData.getConnection();
    const [result, columnFields] = await connection.query(statement);
    return ctxData.camelizeKeys(result);
  }
  catch (e) {
    // Logger.error(e.stack);
    console.error(e.stack);
    throw e;
  }
};

module.exports = {
  userQuery,
};