// 获取代码文件的根目录
function rootPath() {
  const path = require('path');
  const rootPath = path.resolve(__dirname, '..'); //代码文件的根路径
  return rootPath;
}

module.exports = {
  rootPath
};
