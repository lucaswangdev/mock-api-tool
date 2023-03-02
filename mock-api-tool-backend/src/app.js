"use strict";

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = new Router();
const app = new Koa();
const config = require("./config/index");
// 路由前缀
// router.prefix('/api');

const MockController = require('./controller/MockController');

app.use(bodyParser());
app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port);
console.log(`http://localhost:${config.port}`);
//----------------------------------------------------------------

router.post("/insert", MockController.insert);
router.post("/update", MockController.update);
router.post("/findById", MockController.findById);
router.post("/deleteApi", MockController.deleteApi);

/**
 * 数据库中保存的 mock 接口 数据
 */
router.all("/mock/:url(.+)", MockController.all)