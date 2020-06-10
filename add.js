'use strict'

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const fs = require('fs')
const path = require('path')
const koaBody = require('koa-body');
const app = new Koa();
const router = new Router();
router.prefix('/api');
// 服务启动的端口号
const port = '';

const writeFileRecursive = function(path, buffer, callback){
  let lastPath = path.substring(0, path.lastIndexOf("/"));
  fs.mkdir(lastPath, {recursive: true}, (err) => {
      if (err) return callback(err);
      fs.writeFile(path, buffer, function(err){
          if (err) return callback(err);
          return callback(null);
      });
  });
}

/**
 * type:get
 * path:/test/ddd
 * content:xxx
 */
router.post('/add', async (ctx) => {
  ctx.response.type = 'json'
  const resBody = ctx.request.body;
  // console.log(resBody);
  const dataStr = `
  router.${resBody.type}('${resBody.path}', async(ctx) => {
    ctx.response.type = 'json'
    ctx.response.body = await fs.createReadStream(staticJsonPath + '${resBody.path}.json')
  });
  `
  const fileName1 = path.resolve(__dirname, 'index.js')
  fs.appendFile(fileName1, dataStr, function (err) {
    if (err) {
      // 出错
      console.log(err.message)
      return
    }
    // 写入成功后读取测试
    // var data = fs.readFileSync(fileName1, 'utf-8');
    // console.log(data);
  })

  // 写入文件
  const fileName2 = path.resolve(__dirname, `./static/api${resBody.path}.json`)
  console.log('fileName2 = ', fileName2);
  writeFileRecursive(fileName2, resBody.content, (err)=>{
    if(err) console.error(err);
    console.log('json 文件写入成功');
  });
  ctx.response.body = {
    "result": "添加成功"
  }
})

app
  .use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port || 5000)
console.log(`POST http://localhost:${port || 5000}/api/add`);
