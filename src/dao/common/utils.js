const { camelCase } = require('lodash');

const camelizeKeys = (_obj) => {
  const obj = JSON.parse(JSON.stringify(_obj));
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

module.exports = {
  camelizeKeys
}