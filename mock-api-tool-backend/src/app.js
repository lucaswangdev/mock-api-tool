"use strict";

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const koaJwt = require('koa-jwt');
const router = new Router();
const app = new Koa();
const config = require("./config/index");
// 路由前缀
// router.prefix('/api');
const routerResponse = require("./middleware/routerResponse");
const errorHandle = require("./middleware/errorHandle");

const MockController = require('./controller/MockController');
const UserController = require('./controller/UserController');

app
  .use(errorHandle())
  .use(koaJwt({
    secret: config.secret,
  }).unless({
    path: [/\/register/, /\/login/],
  }))
  .use(bodyParser())
  .use(cors())
  .use(routerResponse())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port);
console.log(`http://localhost:${config.port}`);
//----------------------------------------------------------------

router.post("/insert", MockController.insert);
router.post("/update", MockController.update);
router.post("/findById", MockController.findById);
router.post("/deleteApi", MockController.deleteApi);
router.post("/findAll", MockController.findAll);

router.post("/user/register", UserController.register);
router.post("/user/login", UserController.login);

/**
 * 数据库中保存的 mock 接口 数据
 */
router.all("/mock/:url(.+)", MockController.all)