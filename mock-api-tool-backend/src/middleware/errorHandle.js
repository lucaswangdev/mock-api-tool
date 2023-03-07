module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err)
      if (err.status === 401) {
        ctx.status = 200;
        ctx.body = {
          success: false,
          code: 401,
          msg: "UnauthorizedError"
        };
      } else {
        throw err;
      }
    }
  };
};
