"use strict";

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = new Router();
const app = new Koa();
const util = require("util");
const config = require("./config");

// get the client
const mysql = require("mysql2");
// create the pool
const pool = mysql.createPool(config.mysqlConfig);
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();
// sleep
const sleep = util.promisify(setTimeout);

app.use(bodyParser());

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port);
console.log(`http://localhost:${config.port}`);
//----------------------------------------------------------------

/**
 * 添加 mock 接口
 */
router.post("/add", async (ctx) => {
  ctx.response.type = "json";
  // 请求体参数
  const resBody = ctx.request.body;
  console.log("resBody===>", resBody);
  const data = {
    api_path: resBody.api_path,
    api_content: resBody.api_content
      ? JSON.stringify(resBody.api_content)
      : "{}",
  };
  try {
    const [ResultSetHeader] = await promisePool.query(
      "insert into api_list set ? ",
      data
    );
    if (ResultSetHeader.affectedRows > 0) {
      ctx.response.body = {
        success: true,
        errorMsg: "操作成功",
      };
    }
  } catch (error) {
    ctx.response.body = {
      success: true,
      errorMsg: error.message,
    };
  }
});

/**
 * 自定义 mock 接口，写在 router.all 路由前面，优先匹配
 */
router.post("/mock/xxx", async (ctx) => {
  ctx.response.type = "json";
  // 请求体参数
  const resBody = ctx.request.body;
  console.log("resBody===>", resBody);
  ctx.response.body = {
    success: true,
    errorMsg: "操作成功",
  };
});

/**
 * 数据库中保存的 mock 接口
 */
router.all("/mock/:url(.+)", async (ctx) => {
  let { repositoryId, url } = ctx.params;
  ctx.response.type = "json";
  try {
    const [rows = [], fields] = await promisePool.query(
      `select * from api_list where api_path="${url}"`
    );
    if (rows.length > 0) {
      const lastRowDataObj = rows[rows.length - 1];
      // 延时时间
      if (lastRowDataObj.delay > 0) {
        await sleep(lastRowDataObj.delay * 1000);
      }
      ctx.response.body = {
        success: true,
        errorMsg: "",
        errorCode: "",
        data: JSON.parse(lastRowDataObj.api_content) || {},
      };
    } else {
      ctx.response.body = {
        success: false,
        errorMsg: "not found",
      };
    }
  } catch (error) {
    ctx.response.body = {
      success: false,
      errorMsg: error.message,
    };
  }
});
