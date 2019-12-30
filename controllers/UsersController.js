const usersModel = require('../models/usersModel');

class UsersController {
  // 用户登录
  async login(ctx, next) {
    // 获取请求提交的数据
    let name = ctx.request.body.name || '',
      pwd = ctx.request.body.pwd || '';
    console.log(name, pwd);

    // do something

    ctx.body = {
      status: true,
      token: '123'
    };
  }

  // 用户信息
  async userInfo(ctx, next) {
    // do something
    console.log(ctx);
    // 假设这是请求回来的数据
    let data = {
      name: 'jk',
      age: 25
    };
    ctx.body = {
      status: true,
      data
    };
  }

  // 获取所有的用户信息
  async userAllInfo(ctx, next) {
    let data = await usersModel.userAllInfo();
    ctx.body = data;
  }
}

module.exports = new UsersController();
