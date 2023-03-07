const util = require("util");
const sleep = util.promisify(setTimeout);
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const CtxData = require("../dao/common/CtxData");
const UserService = require("../service/UserService");
const { secret } = require("../config");

/**
 * register
 */
const register = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  console.log("resBody===>", resBody);
  const { userName, userAccount, userPassword} = resBody;
  if(!(userAccount && userPassword)) {
    ctx.fail({
      msg: '用户名或密码不能为空'
    });
    return;
  }
  // authentication will take approximately 13 seconds
  // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
  const hashCost = 10;
  const _userPassword = await bcrypt.hash(userPassword, hashCost)
  const data = {
    userName: resBody.userName || '',
    userAccount: resBody.userAccount,
    userPassword: _userPassword,
  };
  try {
    await ctxData.start(false);
    const userList = await UserService.findByUserAccount(ctxData, { 
      userAccount: resBody.userAccount
    });
    if(!userList.length) {
      await UserService.insert(ctxData, data);
      ctx.response.body = {
        success: true,
        msg: "操作成功",
      };
    } else {
      ctx.fail({
        msg: '用户名已经存在'
      });
    }
  } catch (e) {
    // Logger.error(e.stack);
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
 * login
 */
const login = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  console.log("resBody===>", resBody);
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
    const userList = await UserService.findByUserAccount(ctxData, data);
    if(!userList.length) {
      ctx.fail({
        msg: '用户名或密码不能为空'
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
    // Logger.error(e.stack);
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

    }


    ctx.response.body = {
      success: true,
      msg: "操作成功",
      data: mockList[0] || {}
    };
  } catch (e) {
    // Logger.error(e.stack);
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
 * update
 */
const update = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  console.log("resBody===>", resBody);
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
    await UserService.update(ctxData, data);
    ctx.response.body = {
      success: true,
      msg: "操作成功",
    };
  } catch (e) {
    // Logger.error(e.stack);
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
  console.log("resBody===>", resBody);
  const data = {
    id: resBody.id,
  };
  try {
    await ctxData.start(false);
    await UserService.deleteApi(ctxData, data);
    ctx.response.body = {
      success: true,
      msg: "操作成功",
    };
  } catch (e) {
    // Logger.error(e.stack);
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
 * findAll
 */
const findAll = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const data = {};
  try {
    await ctxData.start(false);
    const mockList = await UserService.findAll(ctxData, data);
    ctx.response.body = {
      success: true,
      msg: "操作成功",
      data: mockList || []
    };
  } catch (e) {
    // Logger.error(e.stack);
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
  register,
  login,
  update,
  deleteApi,
  findAll,
};