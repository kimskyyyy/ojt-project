var express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createHttpError = require('http-errors');

var router = express.Router(); // router 객체는 express.Router()로 만듦

// 파일을 업로드할 uploads 폴더 생성
fs.readdir('uploads', (error) => {
    if(error) {
        console.log('uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

const upload = multer({
    storage: multer.diskStorage({
        // 파일 저장 경로
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        // 파일 저장명 설정
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            // cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
            cb(null, path.basename(file.originalname, ext));
        },
    }),
    // 파일 최대 용량
    // limits: {fileSize: 5 * 1024 * 1024}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('파일 업/다운로드 라우터 get요청 확인');
});

/* GET users listing. */
router.get('/:fileName', function(req, res, next) {
    const fileName = req.params.fileName;
    let isFileExist;

    try {
        isFileExist = fs.existsSync(`uploads/${fileName}`);
    } catch(err) {
        const error = new createHttpError(
            "에러발생.", 500
        );
        next(error);
    }

    if(!isFileExist) {
        const error = new createHttpError("파일이 존재하지 않습니다.", 500);
        next(error);
    }

    try {
        res.download(`uploads/${fileName}`);
    } catch(err) {
        const error = new createHttpError("다운로드 에러", 500);
    }
    // res.send('파일 다운로드 완료');
  });

/* POST users listing. */
router.post('/', upload.array('files', 10),function(req, res, next) {
    console.log(req.files);
    // console.log(req.file.originalname);
    res.json(`~~post 요청 응답~~`);
  });

module.exports = router; // 라운터를 모듈로 만듦