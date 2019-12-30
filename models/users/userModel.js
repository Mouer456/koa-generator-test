const { query } = require('../../util/db');

class UserModel {
  // 获取所有的用户信息
  async userAllInfo() {
    let sql = 'SELECT * FROM user';
    let dataList = await query(sql);
    return dataList;
  }
}

module.exports = new UserModel();
