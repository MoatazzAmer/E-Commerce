import { model, Schema } from "mongoose";



const schema = new Schema({
    name :{
        type:String,
        minLength :[2 , 'too short brand name'],
        required:true,
        trim : true,
        unique : [true , 'name is required']
    },
    logo : String,
    slug:{
        type :String,
        lowerCase : true,
        required : true
        }
},{
    versionKey:false,
    timestamps:true
});


schema.post('init',function(doc){
    if(doc.logo) doc.logo = process.env.BASE_URL +"brands/" + doc.logo
})

export const Brand = model('Brand',schema)