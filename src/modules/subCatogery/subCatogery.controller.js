import slugify from "slugify";
import { Catoogery } from "../../../database/models/catogery.model.js";
import { SubCatoogery } from "../../../database/models/subCatogery.model.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";
import { deleteOne } from "../../utils/cradModel.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";



const addSubCatogery = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name);

    const subcatogery = new SubCatoogery(req.body);

    await subcatogery.save()
    res.status(201).json({message : 'Success Added' , subcatogery})
});

const getOneSubCatogery = catchError(async(req,res,next)=>{


    const subcatogery = await SubCatoogery.findById(req.params.id).populate('catogery');

    subcatogery ||  next(new appError('Catogery Not Found' , 401));
    !subcatogery || res.status(201).json({message :'Success Get One Subcatogery',subcatogery})
})


const getAllSubCatogery = catchError(async(req,res,next)=>{
    let filter ={};
    if(req.params.catogery) filter.category = req.params.catogery

    let apiFeatures = new ApiFeatures(SubCatoogery.find(filter), req.query)
    .pagination().filter().fields().sort().search()
    const subCategories = await apiFeatures.mongooseQuery

    res.status(201).json({message :'Success Get All Products' ,page : apiFeatures.pageNumber,subCategories})
})


const updateSubCatogery = catchError(async(req,res,next)=>{


    const subcatogery = await SubCatoogery.findByIdAndUpdate(req.params.id , req.body , {new : true});

    subcatogery ||  next(new appError('Catogery Not Found' , 401));
    !subcatogery || res.status(201).json({message :'Success Updated',subcatogery})
})


const deleteSubCatogery = deleteOne(SubCatoogery)
export{
    addSubCatogery,
    getOneSubCatogery,
    getAllSubCatogery,
    updateSubCatogery,
    deleteSubCatogery
}