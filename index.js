"use strict";

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const sleep = require("koa-sleep");
const router = new Router();
const app = new Koa();

// 路由前缀
router.prefix('/api');
// 服务启动的端口号
const port = 4000;
app.use(bodyParser());
// 休眠
// app.use(sleep(3000))

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port || 4000);
console.log(`http://localhost:${port || 4000}/api/users/userId`);
//----------------------------------------------------------------

router.get("/users/userId", async (ctx) => {
  ctx.response.type = "json";
  ctx.response.body = {
    name: "get",
  };
});

router.post("/users/userId2", async (ctx) => {
  ctx.response.type = "json";
  // 请求体参数
  const resBody = ctx.request.body;
  console.log("resBody===>", resBody);
  ctx.response.body = {
    name: "post",
  };
});

router.put("/users/userId3", async (ctx) => {
  ctx.response.type = "json";
  ctx.response.body = {
    name: "put",
  };
});

router.delete("/users/userId4", async (ctx) => {
  ctx.response.type = "json";
  ctx.response.body = {
    name: "delete",
  };
});

//--------------新增的接口(开始)-----------------//


//--------------新增的接口(结束)-----------------//