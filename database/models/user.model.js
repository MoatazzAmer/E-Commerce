import { model, Schema } from "mongoose";



const schema = new Schema({
    name : {
        type : String,
        required: true
    },
    email : String,
    password : String,
    role : {
        type:String,
        enum :['user','admin'],
        default :'user'
    },
    confirmEmail : {
        type : Boolean,
        default : false
    },
    isBlooked : {
        type :Boolean,
        default :false
    },
    otp : String,
    otpExpires : Date
},{
    versionKey: false,
    timestamps:true
});


export const User = model('User', schema)