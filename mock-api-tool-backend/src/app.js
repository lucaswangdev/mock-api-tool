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
router.prefix('/api');
const routerResponse = require("./middleware/routerResponse");
const errorHandle = require("./middleware/errorHandle");

const MockController = require('./controller/MockController');
const UserController = require('./controller/UserController');
const ProjectController = require('./controller/ProjectController');
const ProjectUserController = require('./controller/ProjectUserController');


// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 200;
      ctx.body = {
        success: false,
        code: 401,
        msg: "unAuthorizedError"
      };
    } else {
      throw err;
    }
  });
});

app
  .use(koaJwt({
    secret: config.secret,
  }).unless({
    path: [/\/api\/user\/register/, /\/api\/user\/login/, /^\/api\/mock/],
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
router.post("/user/userInfo", UserController.userInfo);
router.post("/user/logout", UserController.logout);
router.post("/user/findAllByProject", UserController.findAllByProject);

router.post("/project/projectList", ProjectController.projectList);
router.post("/project/insert", ProjectController.insert);

router.post("/project-user/insert", ProjectUserController.insert);
router.post("/project-user/delete", ProjectUserController.deleteProjectUser);



/**
 * 数据库中保存的 mock 接口 数据
 */
router.all("/mock/:projectCode/:url(.+)", MockController.all)