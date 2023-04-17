const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number, // 데이터타입 : Number
    required: true, // 무족건 값이 있어야지만 사용할 수 있게끔 설정
    unique: true, // 해당하는 값이 무족건 고유한 값이여야한다
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
});


//"Defaults라는 이름으로 defaultSchema 모듈을 사용 할 것이다"
module.exports = mongoose.model("Goods", goodsSchema);
