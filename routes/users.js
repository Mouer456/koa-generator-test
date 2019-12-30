const router = require('koa-router')();
const userController = require('../controllers/users/UserController');

router.prefix('/users');

router
  // 用户模块
  .post('/login', userController.login)
  .get('/userinfo', userController.userInfo);

module.exports = router;
