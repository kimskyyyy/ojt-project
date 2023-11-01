var express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

var router = express.Router(); // router 객체는 express.Router()로 만듦

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("post 라우터 테스트");
});

module.exports = router; // 라운터를 모듈로 만듦
