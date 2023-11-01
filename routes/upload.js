var express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

const response = require("../util/response");

var router = express.Router(); // router 객체는 express.Router()로 만듦

// 파일을 업로드할 uploads 폴더 생성
fs.readdir("uploads", (error) => {
  if (error) {
    console.log("uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
});
// 파일 업로드 설정
const upload = multer({
  storage: multer.diskStorage({
    // 파일 저장 경로 설정
    destination(req, file, cb) {
      // cb 콜백 함수를 통해 전송된 파일 저장 디렉토리 설정, 'uploads/' 디렉토리로 지정
      cb(null, "uploads/");
    },
    // 파일 저장명 설정
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      // cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
      // cb 콜백 함수를 통해 전송된 파일 이름 설정
      cb(null, path.basename(file.originalname, ext));
    },
  }),
  // 파일 최대 용량
  limits: { fileSize: 5 * 1024 * 1024 },
});

// api 요청 섹션 시작
// 단일 파일 업로드 multer.single(fileName)
router.post("/single", upload.single("file"), function (req, res, next) {
  console.log("단일 파일 업로드 요청");
  console.log(req.file);
  const imagePath = req.file.path;
  if (imagePath === undefined) {
    return res.status(400).send(response.fail(400, "파일이 없습니다."));
  }
  res
    .status(200)
    .send(response.success(200, "파일 업로드 성공", `저장경로: /${imagePath}`));
});

// n개 파일 업로드 multer.array(, 개수제한)
/* POST users listing. */
router.post("/", upload.array("files", 10), function (req, res, next) {
  console.log(req.files);
  // res.json(`~~post 요청 응답~~`);
  res
    .status(200)
    .send(
      response.success(200, "파일 업로드 성공", `파일개수: ${req.files.length}`)
    );
});

module.exports = router; // 라운터를 모듈로 만듦
