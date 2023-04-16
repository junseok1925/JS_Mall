const add = require("./math.js")
// math.js에서 밖으로 보낸 add함수 모듈을 가져온다

console.log(add(10,30)); //40 -> 정상적으로 잘 add함수를 잘 불러옴

//export로 하나씩 보낸것을 받았을때는 객체로 받기 때문에 
console.log(add.add(10,30));

//==============================================================

// 객체구조분해할당을 통해서 간략하게 사용가능
const {add} = require("./math.js")
console.log(add(10,30));