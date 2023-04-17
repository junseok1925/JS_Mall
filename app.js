const express = require("express");
const app = express();
const port = 3000;

const goodsRouter = require("./routes/goods.js"); //goods.js에 있는 router를 반환받음
const cartsRouter = require("./routes/carts.js");
const connect = require("./schemas");
connect(); // 가져온 connect 함수 실행

//body-parser Middleware를 쓰기 위한 문법이다, 전역 middleware를 적용하겠다
// 모든 코드에서 body-parse를 등록해서 Request안에 있는 body데이터를 쓰겠다
//post로 들어오는 body데이터를 사용하기 위해서는 이 문법을 통해 사용가능
// localhost:3000/api -> goods Router
app.use(express.json());
//전역미들웨어
// 기본적으로 코드는 위에서 아래로 실행되기때문에 app.use()를 거치고 아래 코드 실행됨
//  URL주소뒤에 "/api" 이 경로로 들어왔으면 goodRouter를 통해서 가라
app.use("/api", [goodsRouter, cartsRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

//req.params
// app.get("/:id",(req,res)=>{
//   console.log(req.params);
//   res.send(":id URI에 정상적으로 반환되었습니다.");
// });

//req.query
// app.get("/",(req, res)=>{
//   console.log(req.query);
//   res.send('req.query 정상적으로 반환되었다.');
// });

//res.body
// app.post("/",(req, res)=>{
//   console.log(req.body );
//   res.send('기본 URL에 POST메서드가 정상적으로 반환되었다');
// });

// //req.json()
// app.get("/",(req,res)=>{
//   console.log(req.query );

//   // 객체 형태로 바로 넣어두됨
//   const obj = {
//     "keykey" : "value 입니다",
//     "이름입니다" : "이름일까요?"
//   }
//   res.json(obj);
// });
// //req.json()
// app.get("/",(req,res)=>{
//   console.log(req.query );
//   // 바로 json안에 객체를 넣어두됨
//   res.json({
//     "keykey" : "value 입니다",
//     "이름입니다" : "이름일까요?"
//   });
// });
