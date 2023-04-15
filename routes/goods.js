const express = require("express");     // express라이브러리를 express 변수에 할당
const router = express.Router();        // 다시 express.Router()라는 함수를 실행시켜 router이라는 변수에 할당

//localhost:3000/api/ GET  -> app.js에서 app.use()함수로 인해 /api로 들어오면 goodsRouter 즉, goods.js로 연결시켰기 때문
router.get('/',(req,res) => {           // get Method를 받았을 때, 기본경로('/')에 들어왔을 때 해당 코드를 실행하라
    res.send("default url for good.js GET Method");  
  //res: 반환할꺼다
})

//localhost:3000/api/about GET
router.get('/about', (req,res)=>{
    res.send("good.js about PATH")
})

module.exports = router; // good.js파일 안에 있는 변수router를 app.js에 보내줘야할때 선언 방식