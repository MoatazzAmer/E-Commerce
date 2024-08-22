
import mongoose, { model, Schema } from "mongoose";



const schema = new Schema({
    title :{
        type:String,
        minLength :[2 , 'too short brand name'],
        required:true,
        trim : true,
        unique : [true , 'name is required']
    },
    slug:{
        type :String,
        lowerCase : true,
        required : true
        },
    description :{
        type:String,
        required : true,
        minLength:30,
        maxLength : 2000
    },
    imageCover :String,
    images :[String],
    price : {
        type:Number,
        required: true,
        min :0
    },
    priceAfterDiscount :{
        type:Number,
        required :true,
        min:0
    },
    sold:Number,
    stock:{
        type:Number,
        min :0
    },
    catogery:{
        type: mongoose.Types.ObjectId,
        ref : 'Catogery',
        required:true
    },
    subCatogery:{
        type: mongoose.Types.ObjectId,
        ref : 'SubCatogery',
        required:true
    },
    brand:{
        type: mongoose.Types.ObjectId,
        ref : 'Brand',
        required:true
    },
    rateAvg :{
        type:Number,
        min:0,
        max:5
    },
    rateCount :Number
},{
    versionKey:false,
    timestamps:true,
    toJSON: { virtuals: true },
    id :false
});


schema.virtual('myReview', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
});

schema.pre('findOne',function(){
    this.populate('myReview')
})


schema.post('init',function(doc){
    if(doc.imageCover) doc.imageCover = process.env.BASE_URL +"products/" + doc.imageCover
    if(doc.images) doc.images = doc.images.map(val =>process.env.BASE_URL + "products/"+val)
})

export const Product = model('Product',schema)