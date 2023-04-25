const express = require("express"); // express라이브러리를 express 변수에 할당
const router = express.Router(); // 다시 express.Router()라는 함수를 실행시켜 router이라는 변수에 할당
const Goods = require("../schemas/goods.js");
const Cart = require("../schemas/cart.js");
const authMiddleware = require("../middlewares/auth-middleware");

//===================================== 장바구니 상품조회 api //=====================================

router.get("/goods/cart", authMiddleware, async (req, res) => {
  const { userId } = res .locals.user;
  const carts = await Cart.find({ userId: userId }).exec();
  const goodsIds = carts.map((cart) => {
    return cart.goodsId;
  });
  const goods = await Goods.find({ goodsId: goodsIds });
  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId),
    };
  });

  res.json({
    carts: results,
  });
});

// ===================================== 상품목록조회(카테고리별로) =====================================

router.get("/goods", async (req, res) => {
  const { category } = req.query;

  const goods = await Goods.find(category ? { category } : {}) //카테고리를 설정안하면,없다면 -> 전체조회를 시켜라
    .sort("-data") // 내람차순으로 정렬한다
    .exec();

  const results = goods.map((item) => {
    return {
      goodsId: item.goodsId,
      name: item.name,
      price: item.price,
      thumbnailUrl: item.thumbnailUrl,
      category: item.category,
    };
  });
  res.status(200).json({ goods: results });
});

//===================================== 상품 상세 조회 API =====================================

router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;

  const goods = await Goods.findOne({ goodsId: goodsId }).exec();

  const result = {
    goodsId: goods.goodsId,
    name: goods.name,
    price: goods.price,
    thumbnailUrl: goods.thumbnailUrl,
    category: goods.category,
  };

  res.status(200).json({ goods: result });
});

//===================================== 장바구니 등록 API =====================================

router.post("/goods/:goodsId/cart", authMiddleware, async (req, res) => {
  const {userId} = res.locals.user;
  const { goodsId } = req.params;
  const { quantity } = req.body;

  // 장바구니를 사용자 정보{userId}를 가지고, 장바구니를 조회한다
  const existsCarts = await Cart.find({ userId, goodsId });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
    });
  }
  // 해당하는 사용자의 정보 {userId}가지고, 장바구니에 상품을 등록한다  
  await Cart.create({ userId,goodsId, quantity });
  res.json({ result: "success" });
});

// ===================================== 장바구니상품 수정 API =====================================

router.put("/goods/:goodsId/cart", authMiddleware, async (req, res) => {
  const {userId} = res.locals.user;
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ userId,goodsId });
  if (existsCarts.length) {
    await Cart.updateOne(
      //goodsId에 해당하는 값이 있을 때 quantity를 변수 quantity에 있는 값으로 수정을 할 것이다.
      { userId, goodsId: goodsId },
      { $set: { quantity: quantity } }
    );
  }
  res.status(200).json({ success: true });
});

// ===================================== 장바구니 상품 삭제하기 API =====================================

router.delete("/goods/:goodsId/cart",authMiddleware, async (req, res) => {
  const {userId} = res.locals.user;
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ userId,goodsId });
  if (existsCarts.length) {
    await Cart.deleteOne({ userId, goodsId });
  }

  res.json({ result: "success" });
});

//=====================================  상품 등록 API =====================================

router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  //goodsId는 고유한 값이여하기때문에 동일한 goodsId가 있는지 확인
  const goods = await Goods.find({ goodsId }); // await : 동기적으로 처리해라

  // 만약 goods에 길이가 존재하면 이미 값이 있는 것이므로 에러
  if (goods.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 GoodsId입니다.",
    });
  }

  //===================================== 상품을 등록하는 코드 =====================================

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
