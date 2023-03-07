const  jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../config');

/**
 * getJwtPayload
 * @param {*} token 
 * @returns 
 */
const getJwtPayload = (token='') => {
  return jsonwebtoken.verify(token.split(' ')[1], secret);
}

module.exports = getJwtPayload