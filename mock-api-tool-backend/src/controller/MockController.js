const util = require("util");
const sleep = util.promisify(setTimeout);
const CtxData = require("../dao/common/CtxData");
const MockService = require("../service/MockService");

/**
 * insert
 */
const insert = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const { userId } = ctx.state.user;
  const data = {
    api_path: resBody.apiPath,
    api_content: resBody.apiContent
      ? resBody.apiContent
      : "{}",
    delay: resBody.delay? resBody.delay : 0,
    api_description: resBody.apiDescription
      ? resBody.apiDescription
      : "",
    userId
  };
  try {
    await ctxData.start(false);
    await MockService.insert(ctxData, data);
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
 * update
 */
const update = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const { userId } = ctx.state.user;
  const data = {
    id: resBody.id,
    api_path: resBody.apiPath ? resBody.apiPath : "",
    api_content: resBody.apiContent ? resBody.apiContent : "{}",
    delay: resBody.delay? resBody.delay : 0,
    api_description: resBody.apiDescription
      ? resBody.apiDescription
      : "",
    userId
  };
  try {
    await ctxData.start(false);
    await MockService.update(ctxData, data);
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
 * findById
 */
const findById = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const { userId } = ctx.state.user;
  const data = {
    id: resBody.id,
    userId
  };
  try {
    await ctxData.start(false);
    const mockList = await MockService.findById(ctxData, data);
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
 * deleteApi
 */
const deleteApi = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  const { userId } = ctx.state.user;
  const data = {
    id: resBody.id,
    userId
  };
  try {
    await ctxData.start(false);
    await MockService.deleteApi(ctxData, data);
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
  const { userId } = ctx.state.user;
  const data = {
    userId
  };
  try {
    await ctxData.start(false);
    const mockList = await MockService.findAll(ctxData, data);
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

/**
 * all
 */
const all = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  let { repositoryId, url } = ctx.params;
  const resBody = ctx.request.body;
  const { userId } = ctx.state.user;
  const { pageNum, pageSize } = resBody;
  if(!userId) {
   ctx.fail({
      data: {
        msg: "not found Authorization token"
      }
    })
    return;
  }
  const data = {
    api_path: url,
    userId
  };
  try {
    await ctxData.start(false);
    const mockList = await MockService.findByApiPath(ctxData, data);
    if (mockList.length > 0) {
      const lastRowDataObj = mockList[mockList.length - 1];
      // 延时时间
      if (lastRowDataObj.delay > 0) {
        await sleep(lastRowDataObj.delay * 1000);
      }
      const apiContentData = JSON.parse(lastRowDataObj.apiContent);
      // 模拟返回分页查询数据
      if(pageNum && pageSize && apiContentData.data) {
        // 通过 handlePages 定制返回分页查询结果
        ctx.response.body = ctxData.handlePages(pageNum, pageSize, apiContentData.data);
      } else {
        ctx.response.body = apiContentData || {};
      }
    } else {
      ctx.response.body = {
        success: false,
        msg: "not found",
      };
    }
  } catch (e) {
    // Logger.error(e.stack);
    await ctxData.error();
    ctx.response.body = {
      success: false,
      msg: e.message || "操作失败",
    };
  } finally {
    await ctxData.end();
  }
};


module.exports = {
  insert,
  update,
  findById,
  deleteApi,
  findAll,
  all
};