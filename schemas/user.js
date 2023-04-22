const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true, // 중복 불가능
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});
//virtual() 메서드를 사용하여 가상 속성인 userId를 정의한다.
// 이 가상 속성은 Mongoose의 ObjectId인 _id를 16진수 문자열로 변환하여 반환한다.
// 이렇게 변환된 _id를 사용자 ID로 사용할 수 있다.
UserSchema.virtual("userId").get(function(){
    return this._id.toHexString();
});
// set() 메서드를 사용하여 UserSchema의 JSON 출력 설정을 변경합. 이 설정은 toJSON 속성에 지정된다.
// virtuals 옵션을 true로 설정하여 JSON으로 변환할 때 가상 속성을 포함한다.
// 이렇게 하면 userId 가상 속성이 JSON으로 변환되어 출력된다.
UserSchema.set("toJSON",{
    virtuals:true, // JSON 형태로 가공할 때, userId를 출력 시켜준다.
});

 module.exports = mongoose.model("User", UserSchema);