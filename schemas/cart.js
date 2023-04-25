const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {       // 장바구니 특정 사용자 구별용도
    type: String, // ObjectId 이기 때문에, 문자열로
    required: true, // 장바구니는 특정한 사용자만 사용할 수 있다
  },
  goodsId: {
    type: Number, // 데이터타입 : Number
    required: true, // 무족건 값이 있어야지만 사용할 수 있게끔 설정
    unique: true, // 해당하는 값이 무족건 고유한 값이여야한다
  },
  quantity: {
    type: Number,
    require: true,
  },
});

//"Defaults라는 이름으로 defaultSchema 모듈을 사용 할 것이다"
module.exports = mongoose.model("Cart", cartSchema);
