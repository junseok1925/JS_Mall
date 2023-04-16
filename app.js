const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require('./routes/goods.js') //goods.js에 있는 router를 반환받음

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//localhost:3000/api -> goodsRouter
//전역미들웨어
app.use("/api",goodsRouter);  // 기본적으로 코드는 위에서 아래로 실행되기때문에 app.use()를 거치고 아래 코드 실행됨
                   // URL주소뒤에 "/api" 이 경로로 들어왔으면 goodRouter를 통해서 가라

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

