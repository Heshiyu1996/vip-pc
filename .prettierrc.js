const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,

  printWidth: 150, // 设置prettier单行输出（不折行）的（最大）长度
};
