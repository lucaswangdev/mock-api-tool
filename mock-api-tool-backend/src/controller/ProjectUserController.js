const util = require("util");
const sleep = util.promisify(setTimeout);
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const CtxData = require("../dao/common/CtxData");
const ProjectUserService = require("../service/ProjectUserService");
const UserService = require("../service/UserService");
const { secret } = require("../config");
const Logger = require("../utils/logger");

/**
 * insert
 */
const insert = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const { userAccount, projectCode } = resBody;
  const data = {
    userAccount
  };
  try {
    await ctxData.start(false);
    const userList = await UserService.findByUserAccount(ctxData, data);
    if(!userList.length) {
      await UserService.insert(ctxData, data);
      ctx.fail({
        msg: "操作失败，添加的账号不存在"
      })
      return;
    }
    const user = userList[0] || {};
    const { id } = user;
    await ProjectUserService.insert(ctxData, {
      projectCode,
      userId: id
    });
    ctx.success();
  } catch (e) {
    Logger.error(e.stack);
    await ctxData.error();
    ctx.response.body = {
      success: false,
      msg: "操作失败",
    };
  } finally {
    await ctxData.end();
  }
};

/**
 * deleteProjectUser
 */
const deleteProjectUser = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const { userId, projectCode } = resBody;
  // const { userId } = ctx.state.user;
  if(!(userId && projectCode)) {
    ctx.fail({
      msg: '用户名称、项目ID不能为空'
    })
    return;
  }
  const data = {
    projectCode,
    userId
  };
  try {
    await ctxData.start(false);
    const userList = await UserService.findAllByProject(ctxData, {
      projectCode
    });
    if (userList.length <= 1) {
      ctx.fail({
        msg: '项目至少有一个成员'
      })
      return;
    }
    await ProjectUserService.deleteProjectUser(ctxData, data);
    ctx.response.body = {
      success: true,
      msg: "操作成功",
    };
  } catch (e) {
    Logger.error(e.stack);
    await ctxData.error();
    ctx.response.body = {
      success: false,
      msg: "操作失败",
    };
  } finally {
    await ctxData.end();
  }
};

module.exports = {
  insert,
  deleteProjectUser,
};