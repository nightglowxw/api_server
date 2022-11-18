// 导入数据库操作模块
const db = require("../db/index");
// 导入密码加密模块
const bcrypt = require("bcryptjs");

// 注册新用户
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body;
  console.log(userinfo);
  //   对表单中的数据进行合法性校验
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: "用户名或密码不合法！",
    });
  }

  //   定义sql语句，查询用户名是否被占用
  const sqlStr = "select * from ev_users where username=?";
  db.query(sqlStr, userinfo.username, (err, results) => {
    // 执行sql语句失败
    if (err) {
      return res.send({
        status: 1,
        message: err.message,
        mes: '执行sql语句失败'
      });
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      return res.send({
        status: 1,
        message: "用户名被占用",
      });
    }
    // 用户名可以使用,对密码进行加密
    console.log(userinfo);
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    console.log(userinfo);

  });
};

// 登陆
exports.login = (req, res) => {
  res.send("login ok");
};
