const express = require("express"); // express라이브러리를 express 변수에 할당
const router = express.Router(); // 다시 express.Router()라는 함수를 실행시켜 router이라는 변수에 할당

// /routes/goods.js
const goods = [
  //goods라는 변수에 상품목록 할당
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];

// 상품 목록 조회 API
router.get("/goods", (req, res) => {
  res.status(200).json({ goods }); //goods라는 key로 goods라는 변수에 들어 있는 정보를 만들어 준다
});

// 상품 상세 조회 API
// 해당 goods의 id값을 입력하면 입력받은 id에 맞는 goods의 정보만 출력
router.get("/goods/:goodsId", (req, res) => {
  const { goodsId } = req.params;

  // let result = null;
  // for(const good of goods){
  //   if(Number(goodsId) === good.goodsId){
  //     result = good;
  //   }
  // }

  //filter를 사용해서 위의 코드 더 간단하게
  const [result] = goods.filter((goods) => Number(goodsId) === goods.goodsId);

  res.status(200).json({ detail: result });
});

// 장바구니 API
const Cart = require("../schemas/cart.js");
router.post("/goods/:goodsId/cart", async (req,res) => {
   const {goodsId} = req.params;
   const {quantity} = req.body;

   // 장바구니에 같은상품이 있는지 확인
   const existsCarts = await Cart.find({goodsId});
   if(existsCarts.length){
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
    })
   }
   // 상품이 장바구니에 존재하지 않았을 때
   await Cart.create({goodsId, quantity});
   res.json({result:"success"});
})

// 상품 수정 API
router.put("/goods/:goodsId/cart", async(req,res) => {
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length){
    await Cart.updateOne(
      //goodsId에 해당하는 값이 있을 때 quantity를 변수 quantity에 있는 값으로 수정을 할 것이다.
      {goodsId: goodsId},
      {$set: {quantity:quantity}}
    )
  }
  res.status(200).json({success:true});
})

// 장바구니 상품 삭제하기 API
router.delete("/goods/:goodsId/cart", async(req,res) => {
  const {goodsId} = req.params;

  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length){
    await Cart.deleteOne({goodsId});
  }

  res.json({result:"success"});
})

// 상품 등록 API
// post메서드를 이용해서 body데이터를 불러와 등록
const Goods = require("../schemas/goods.js");
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  //goodsId는 고유한 값이여하기때문에 동일한 goodsId가 있는지 확인
  const goods = await Goods.find({ goodsId }); // await : 동기적으로 처리해라

  // 만약 goods에 길이가 존재하면 이미 값이 있는 것이므로 에러
  if (goods.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 GoodsId입니다."
    });
  }

  //상품을 등록하는 코드
  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  res.json({ goods: createdGoods });
});

module.exports = router; // good.js파일 안에 있는 변수router를 app.js에 보내줘야할때 선언 방식

