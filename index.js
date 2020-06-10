'use strict'

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const fs = require('fs')
const staticJsonPath = './static/api'
const router = new Router();
const app = new Koa();
router.prefix('/api');
// 服务启动的端口号
const port = '';

router.get('/users/userId', async(ctx) => {
  ctx.response.type = 'json'
  ctx.response.body = await fs.createReadStream(staticJsonPath + '/users/userId.json')
})

router.post('/users/userId2', async(ctx) => {
  ctx.response.type = 'json'
  ctx.response.body = await fs.createReadStream(staticJsonPath + '/users/userId2.json')
})

router.put('/users/userId3', async(ctx) => {
  ctx.response.type = 'json'
  ctx.response.body = await fs.createReadStream(staticJsonPath + '/users/userId3.json')
})

router.delete('/users/userId4', async(ctx) => {
  ctx.response.type = 'json'
  ctx.response.body = await fs.createReadStream(staticJsonPath + '/users/userId4.json')
})
app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port || 4000);
console.log(`http://localhost:${port || 4000}/api/users/userId`);
//----------------------------------------------------------------
// 下面开始为新增的接口

  