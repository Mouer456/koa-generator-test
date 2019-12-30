const router = require('koa-router')();
const usersController = require('../controllers/usersController');

router.prefix('/users');

// 用户模块
router.post('/login', usersController.login);
router.get('/userinfo', usersController.userInfo);
router.get('/userAllInfo', usersController.userAllInfo);

// 接口格式定义
// router.prefix('/user');
// router.post('/add', ''); // 增加 /api/user/add
// router.post('/info', ''); // 查询单个用户信息 /api/user/info
// router.post('/list', ''); // 查询所有/分页查询 /api/user/list
// router.post('/update', ''); // 修改 /api/user/update
// router.post('/password/update', ''); // 修改密码 /api/user/password/update
// router.post('/delete', ''); // 删除 /api/user/delete

module.exports = router;
