const routerResponse = () => {
  return async (ctx, next) => {
    ctx.success = (option={}) => {
      ctx.type = option.type || "json";
      ctx.body = {
        success: true,
        code: option.code || 0,
        msg: option.msg || "操作成功",
        data: option.data || {},
      };
    };
    ctx.fail = (option={}) => {
      ctx.type = option.type || "json";
      ctx.body = {
        success: false,
        code: option.code || 9999,
        msg: option.msg || "操作失败",
      };
    };
    await next();
  };
}

module.exports = routerResponse;
