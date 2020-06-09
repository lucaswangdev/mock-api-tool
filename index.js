'use strict'

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const fs = require('fs')
const staticJsonPath = './static/api'

const app = new Koa();
const router = new Router();
router.prefix('/api')

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
  .listen(4000)