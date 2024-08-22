import slugify from 'slugify'
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";
import { Brand } from '../../../database/models/brand.model.js';
import { deleteOne, getAll } from '../../utils/cradModel.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';



const addBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name);
    req.body.logo = req.file.filename
    const brand = new Brand(req.body);

    await brand.save()
    res.status(201).json({message : 'Success Addded' , brand})
});

const getOneBrand = catchError(async(req,res,next)=>{


    const brand = await Brand.findById(req.params.id);

    brand ||  next(new appError('brand Not Found' , 401));
    !brand || res.status(201).json({message :'Success Get One Brand',brand})
})


const getAllBrand = catchError(async(req,res,next)=>{
    
    let apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .pagination().filter().fields().sort().search()
    const brands = await apiFeatures.mongooseQuery

    res.status(201).json({message :'Success Get All Products' ,page : apiFeatures.pageNumber,brands})
})


const updateBrand = catchError(async(req,res,next)=>{

    if(req.body.slug) req.body.slug = slugify(req.body.name);
    if(req.file) req.body.logo = req.file.filename

    const brand = await Brand.findByIdAndUpdate(req.params.id , req.body , {new : true});

    brand ||  next(new appError('brand Not Found' , 401));
    !brand || res.status(201).json({message :'Success Updated',brand})
})


const deleteBrand = deleteOne(Brand)
export{
    addBrand,
    getOneBrand,
    getAllBrand,
    updateBrand,
    deleteBrand
}