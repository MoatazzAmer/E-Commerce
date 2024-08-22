import mongoose, { model, Schema } from "mongoose";



const schema = new Schema({
    comment:String,
    user :{
        type : mongoose.Types.ObjectId,
        ref :'User',
        required : true
    },
    product :{
        type : mongoose.Types.ObjectId,
        ref :'Product',
        required : true
    },
    rate :{
        type:Number,
        min:0,
        max:5
    }
},{
    timestamps : true,
    versionKey:false
});


export const Review = model('Review', schema)
