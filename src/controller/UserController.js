const CtxData = require("../dao/common/CtxData");
const UserService = require("../service/UserService");

/**
 * userQuery
 */
const userQuery = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  try {
    await ctxData.start(false);
    const userInfo = await UserService.userQuery(ctxData, {
      id: 1
    });
    console.log(['userInfo ==>', userInfo]);
    ctx.response.body = {
      success: true,
      errorMsg: "操作成功",
      data: userInfo
    };
  } catch (e) {
    // Logger.error(e.stack);
    await ctxData.error();
    ctx.response.body = {
      success: false,
      errorMsg: "操作失败",
    };
  } finally {
    await ctxData.end();
  }
};

module.exports = {
  userQuery,
};