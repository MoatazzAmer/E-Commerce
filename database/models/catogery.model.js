
import { model, Schema } from "mongoose";



const schema = new Schema({
    name :{
        type:String,
        minLength :[2 , 'too short catogery name'],
        required:true,
        trim : true,
        unique : [true , 'name is required']
    },
    slug:{
    type :String,
    lowerCase : true,
    required : true
    },
    image : String,
},{
    versionKey:false,
    timestamps:true
});

schema.post('init',function(doc){
    if(doc.image) doc.image = process.env.BASE_URL +'catogries/' + doc.image
})

export const Catoogery = model('Catogery',schema)