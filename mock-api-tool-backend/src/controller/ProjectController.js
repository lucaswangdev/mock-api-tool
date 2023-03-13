const util = require("util");
const sleep = util.promisify(setTimeout);
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const CtxData = require("../dao/common/CtxData");
const ProjectService = require("../service/ProjectService");
const ProjectUserService = require("../service/ProjectUserService");
const { secret } = require("../config");
const Logger = require("../utils/logger");

/**
 * insert
 */
const insert = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const { projectName, projectCode } = resBody;
  const { userId } = ctx.state.user;
  if(!(projectName && projectCode)) {
    ctx.fail({
      msg: '项目名称或项目ID不能为空'
    });
    return;
  }
  const data = {
    projectName: resBody.projectName || '',
    projectCode: resBody.projectCode,
  };
  try {
    await ctxData.start(true);
    await ProjectService.insert(ctxData, data);
    await ProjectUserService.insert(ctxData, {
      projectCode,
      userId,
    });
    ctx.success();
  } catch (e) {
    Logger.error(e.stack);
    await ctxData.error();
    ctx.response.body = {
      success: false,
      msg: "项目创建失败",
    };
  } finally {
    await ctxData.end();
  }
};

/**
 * login
 */
const login = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const { userAccount, userPassword} = resBody;
  if(!(userAccount && userPassword)) {
    ctx.fail({
      msg: '用户名或密码不能为空'
    });
    return;
  }
  const data = {
    userAccount,
  };
  try {
    await ctxData.start(false);
    const userList = await ProjectService.findByUserAccount(ctxData, data);
    if(!userList.length) {
      ctx.fail({
        msg: '用户名或密码不正确'
      });
      return;
    }
    const user = userList[0] || {};
    const flag = await bcrypt.compare(userPassword, user.userPassword);
    if(flag) {
      ctx.success({
        data: {
          userAccount,
          // 生成 token 返回给客户端
          token: jsonwebtoken.sign({
            userAccount,
            userId: user.id,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
          }, secret),
        }
      })
    } else {
      ctx.fail({
        msg: '用户名或密码不正确'
      });
    }
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
 * projectList
 */
const projectList = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const { userId } = ctx.state.user;
  if(!userId) {
    ctx.fail({
      msg: '登录信息获取失败'
    });
    return;
  }
  const data = {
    userId,
  };
  try {
    await ctxData.start(false);
    const projectList = await ProjectService.findAllByUserId(ctxData, data);
    ctx.success({
      data: {
        projectList: projectList || [],
      }
    })
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
 * logout
 */
const logout = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const { userAccount } = ctx.state.user;
  ctx.success({
    data: {
      msg: "注销成功"
    }
  });
};

/**
 * update
 */
const update = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const data = {
    id: resBody.id,
    api_path: resBody.apiPath ? resBody.apiPath : "",
    api_content: resBody.apiContent ? resBody.apiContent : "{}",
    delay: resBody.delay? resBody.delay : 0,
    api_description: resBody.apiDescription
      ? resBody.apiDescription
      : "",
  };
  try {
    await ctxData.start(false);
    await ProjectService.update(ctxData, data);
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



/**
 * deleteApi
 */
const deleteApi = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const data = {
    id: resBody.id,
  };
  try {
    await ctxData.start(false);
    await ProjectService.deleteApi(ctxData, data);
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
  login,
  projectList,
  update,
  deleteApi,
  logout
};