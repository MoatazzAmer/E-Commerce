import { Schema, model } from "mongoose"




const schema = new Schema({
    code : String,
    expire : Date,
    disCount :Number
},{
    timestamps:true  , versionKey : false
})




export const Copoun = model('Copoun',schema)