import slugify from "slugify";
import { catchError } from "../../midleWare/catchError.js";
import { Product } from "../../../database/models/productmodel.js";
import { appError } from "../../utils/appError.js";
import { deleteOne } from "../../utils/cradModel.js";
import { ApiFeatures } from "../../utils/apiFeatures.js"



const addProduct = catchError(async(req,res,next)=>{

    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.file.images.map((val)=> val.filename)
    const product = new Product (req.body);

    await product.save();
    res.status(201).json({message :"Success Added" , product})
});


const getOneProduct = catchError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id).populate('catogery').populate('subCatogery').populate('brand');

    product || next(new appError('Product Not Found' , 401));
    !product || res.status(201).json({message :'Success Get One Product' ,product})
})

const  getAllProducts = catchError(async(req,res,next)=>{

    let apiFeatures = new ApiFeatures(Product.find(), req.query)
    .pagination().filter().fields().sort().search()
    const products = await apiFeatures.mongooseQuery

    res.status(201).json({message :'Success Get All Products' ,page : apiFeatures.pageNumber,products})
})

const updateProduct = catchError(async(req,res,next)=>{

    if (req.body.slug) req.body.slug = slugify(req.body.title);
    if(req.file) req.body.imageCover = req.files.imageCover[0].filename
    if(req.file) req.body.images = req.file.images.map((val)=> val.filename)
    const product = await Product.findByIdAndUpdate(req.params.id , req.body , {new : true});

    product || next(new appError('Product Not Found' , 401));
    !product || res.status(201).json({message :'Success Updated' ,product})
})

const deleteProduct = deleteOne(Product)

export{
    addProduct,
    getOneProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}