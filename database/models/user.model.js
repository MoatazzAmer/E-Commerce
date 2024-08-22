import bcrypt from 'bcrypt';
import { model, Schema, Types } from "mongoose";

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
    passwordChangedAt:Date,
    otp : String,
    otpExpires : Date,
    adresses :[{
        city : String,
        phone : String,
        street : String
    }],
    wishList :[{type:Types.ObjectId , ref :'Product'}]
},{
    versionKey: false,
    timestamps:true
});


schema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password , 10)
})

schema.pre('findOneAndUpdate',function(){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password , 10)
})

export const User = model('User', schema)                  