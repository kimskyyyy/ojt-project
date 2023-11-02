const Sequelize = require("sequelize"); // Sequelize는 패키지이자 생성자

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env]; // config/config.json에서 데이터베이스 설정을 불러온 후

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // new Sequelize를 통해 mariadb 연결 객체 생성

db.sequelize = sequelize; // db 연결 객체를 재사용하기위해 db.sequelize에 넣어둠

module.exports = db;
