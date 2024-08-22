import slugify from 'slugify'
import { Catoogery } from "../../../database/models/catogery.model.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";
import { deleteOne, getAll } from '../../utils/cradModel.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';



const addCatogery = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name);
    req.body.image = req.file.filename;
    const catogery = new Catoogery(req.body);

    await catogery.save();
    res.status(201).json({message : 'Success Added' , catogery});

});

const getOneCatogery = catchError(async(req,res,next)=>{


    const catogery = await Catoogery.findById(req.params.id);

    catogery ||  next(new appError('Catogery Not Found' , 401));
    !catogery || res.status(201).json({message :'Success Get One Catogery',catogery});

})


const getAllCatogery = catchError(async(req,res,next)=>{

    let apiFeatures = new ApiFeatures(Catoogery.find(), req.query)
    .pagination().filter().fields().sort().search()
    const catogery = await apiFeatures.mongooseQuery

    res.status(201).json({message :'Success Get All Products' ,page : apiFeatures.pageNumber,catogery})
})


const updateCatogery = catchError(async(req,res,next)=>{

    if(req.body.slug) req.body.slug = slugify(req.body.name);
    if(req.file)     req.body.image = req.file.filename
    const catogery = await Catoogery.findByIdAndUpdate(req.params.id , req.body , {new : true});

    catogery ||  next(new appError('Catogery Not Found' , 401));
    !catogery || res.status(201).json({message :'Success Uodated',catogery})
})


const deleteCatogery = deleteOne(Catoogery)
export{
    addCatogery,
    getOneCatogery,
    getAllCatogery,
    updateCatogery,
    deleteCatogery
}