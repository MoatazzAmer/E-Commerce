import { model, Schema, Types } from "mongoose";





const schema = new Schema({

    user :{type: Types.ObjectId, ref:'User'},
    cartItems :[
        {
            product :{type : Types.ObjectId , ref:"Product"},
            quantity :Number,
            price :Number
        }
    ],
    totalOrderPrice:Number,
    shippingAdress : {
        city:String,
        street:String,
        phone:String
    },
    paymentType:{
        type:String,
        enum :['cash', 'card'],
        default : 'cash'
    },
    isPayed :{
        type : Boolean,
        default : false
    },
    paidAt : Date,
    isDeliverd :{
        type:Boolean,
        default:false
    },
    dilverdAt : Date
},{
    timestamps : true , versionKey : false
});



export const Order = model('Order' , schema);

