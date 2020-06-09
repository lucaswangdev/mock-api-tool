# koa-mock

### 使用

```
# 安装依赖
npm install

# 启动
npm run start
```

### 新增接口(只需2步)

- 准备好json文件，放在对应的路径下。
- 新增相应请求类型的路由。

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