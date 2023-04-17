const express = require("express");
const router = express.Router();
//cart.js의 값을 Cart라는 변수에 할당
const Cart = require("../schemas/cart.js");
//goods.js의 값을 Goods라는 변수에 할당
const Goods = require("../schemas/goods.js");

// 상품조회 api
// localhost:3000/api/carts - Get method로 호출
router.get("/carts",async(req,res) => {
    // Cart의 정보값을 모두 가져와서 cart라는 변수에 할당
    const carts = await Cart.find({});
    //[{goodsId, quantity}]가 들어가 있음 
    // map함수를 이용해서 위에 값들을 하나씩 순회해서 리턴된 값(goodsId)들만 goodsId에 할당 시켜준다
    const goodsIds = carts.map((cart) => {
         return cart.goodsId;
    })

    const goods = await Goods.find({goodsId: goodsIds})
    // Goods에 해당하는 모든 정보를 가지고 올건데.
    // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회하라.

    // 결과를 저장하는 변수 생성
    // cart안의 값을 반복문들 돌려서 찾는다
    const results = carts.map((cart) => {
        return{
            "quantity" : cart.quantity,
            // find함수를 이용해 goods안의 모든 item을 찾아서 비교
            "goods" : goods.find((item) => item.goodsId === cart.goodsId),
        }
    })

    res.json({
        "carts":results,
    })

});



module.exports = router;