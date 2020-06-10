# koa-mock

### 使用

```
# 安装依赖
npm install

# 启动mock数据接口
npm run start

# 启动新增接口服务(在另一个Tab栏)
npm run add
```

### 手动新增接口(只需2步)
- 准备好json文件，放在对应的路径下。
- 新增相应请求类型的路由。

### 自动新增接口
```
请求类型：POST
请求参数：
type:get/post/put/delete...
path:/test/ddd
content:xxx
```
![image-20200611010755331](https://tva1.sinaimg.cn/large/007S8ZIlly1gfnoxdvqa9j30o108t3z5.jpg)



#### GET
```js
router.get('/users/userId', async(ctx) => {
  ctx.response.type = 'json'
  ctx.response.body = await fs.createReadStream(staticJsonPath + '/users/userId.json')
})
```
#### POST
```js
router.post('/users/userId2', async(ctx) => {
  ctx.response.type = 'json'
  ctx.response.body = await fs.createReadStream(staticJsonPath + '/users/userId2.json')
})
```

#### PUT
```js
router.put('/users/userId3', async(ctx) => {
  ctx.response.type = 'json'
  ctx.response.body = await fs.createReadStream(staticJsonPath + '/users/userId3.json')
})
```

#### POST
```js
router.delete('/users/userId4', async(ctx) => {
  ctx.response.type = 'json'
  ctx.response.body = await fs.createReadStream(staticJsonPath + '/users/userId4.json')
})
```

### 其他

如果出错了，请删除根目录下相对应的路由，重新发起请求，添加接口。

检查根目录下的index.js文件。

