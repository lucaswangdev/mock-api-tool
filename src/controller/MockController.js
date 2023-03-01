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
  console.log("resBody===>", resBody);
  const data = {
    api_path: resBody.api_path,
    api_content: resBody.api_content
      ? JSON.stringify(resBody.api_content)
      : "{}",
  };
  try {
    await ctxData.start(false);
    await MockService.insert(ctxData, data);
    ctx.response.body = {
      success: true,
      errorMsg: "操作成功",
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
    api_content: resBody.api_content ? JSON.stringify(resBody.api_content) : "{}",
  };
  try {
    await ctxData.start(false);
    await MockService.update(ctxData, data);
    ctx.response.body = {
      success: true,
      errorMsg: "操作成功",
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

/**
 * findById
 */
const findById = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  const resBody = ctx.request.body;
  console.log("resBody===>", resBody);
  const data = {
    id: resBody.id,
  };
  try {
    await ctxData.start(false);
    const mockList = await MockService.findById(ctxData, data);
    ctx.response.body = {
      success: true,
      errorMsg: "操作成功",
      data: mockList[0] || {}
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
    await MockService.deleteApi(ctxData, data);
    ctx.response.body = {
      success: true,
      errorMsg: "操作成功",
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

/**
 * all
 */
const all = async (_ctx) => {
  let ctxData = new CtxData(_ctx);
  let ctx = ctxData.ctx;
  let { repositoryId, url } = ctx.params;
  const resBody = ctx.request.body;
  console.log("resBody===>", resBody);
  const data = {
    api_path: url,
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
      ctx.response.body = {
        success: true,
        errorMsg: "",
        errorCode: "",
        data: JSON.parse(lastRowDataObj.apiContent) || {},
      };
    } else {
      ctx.response.body = {
        success: false,
        errorMsg: "not found",
      };
    }
  } catch (e) {
    // Logger.error(e.stack);
    await ctxData.error();
    ctx.response.body = {
      success: false,
      errorMsg: e.message || "操作失败",
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
  all
};