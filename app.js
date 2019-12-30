// 参考 https://juejin.im/post/5d255d05518825424d656e11

const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('koa-router');
const requireDirectory = require('require-directory'); // 路由的自动加载
// require('module-alias') 路径别名

// const index = require('./routes/index'); // 手动加载路由
// const users = require('./routes/users');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
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
// 1 配置根路由

const router_root = router();
// 在根路由中注册子路由
router_root.prefix('/api');

// 1.1 手动加载路由
// router_root.use(index.routes(), index.allowedMethods());
// router_root.use(users.routes(), users.allowedMethods());

// 1.2 自动加载路由
const modules = requireDirectory(module, './routes', {
  visit: whenLoadModule
});
function whenLoadModule(obj) {
  if (obj instanceof router) {
    router_root.use(obj.routes(), obj.allowedMethods());
  }
}

// 在app中注册根路由
app.use(router_root.routes(), router_root.allowedMethods());

// 2. 不配置根路由
// app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

module.exports = app;
