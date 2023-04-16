// 값을 더하는 함수를 Module로서 밖으로 보내준 다음 run.js에서
// 그 모듈이 실행되게끔 만들어보기 

function add(a,b){
    return a + b;
}

// add함수를 밖으로 보내주기 함수 그자체를 내보내준다
module.exports = add;

// 모듈을 호출했을 때, add 키 값에는 (a,b){return a + b;} 익명함수가 할달되는 방법
exports.add = function(a,b){
    return a + b;
}

// 모듈을 호출했을 때 add 키 값에는 add 함수가 들어가는 방법이다.
module.exports = {add : add};