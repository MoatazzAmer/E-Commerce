import mongoose, { model, Schema } from "mongoose";



const schema = new Schema({
    name :{
        type:String,
        minLength :[2 , 'too short subcatogery name'],
        required:true,
        trim : true,
        unique : [true , 'name is required']
    },
    catogery :{
        type:mongoose.Types.ObjectId,
        ref:'Catogery',
        required : true
    },
    slug:{
        type :String,
        lowerCase : true,
        required : true
        }
},{
    versionKey:false,
    timestamps:true
});

export const SubCatoogery = model('SubCatogery',schema)