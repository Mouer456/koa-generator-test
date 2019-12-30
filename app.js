const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa-cors');

const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(cors());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms - ${new Date()}`);
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// routes
// 1. 配置根路由
const router_root = require('koa-router')();
// 在根路由中注册子路由
router_root.prefix('/api');
router_root.use(index.routes(), index.allowedMethods());
router_root.use(users.routes(), users.allowedMethods());

// 在app中注册根路由
app.use(router_root.routes(), router_root.allowedMethods());

// 2. 不配置根路由
// app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

module.exports = app;
