import { Copoun } from "../../../database/models/copoun.model.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";




const addCopoun = catchError(async(req,res,next)=>{

    const isExists = await Copoun.findOne({code : req.body.code});
    if(isExists) return next(new appError('Copoun Aleardy Exists' , 409))

    const copoun = new Copoun(req.body);
    await copoun.save();
    res.status(201).json({message :"Success Add Copoun" , copoun})
})


const allCopoun = catchError(async(req,res,next)=>{

const copoun = await Copoun.find()
    
    copoun || next(new appError('copoun Not Found' , 401))
    !copoun || res.status(201).json({message :"Success Get All Copoun" , copoun});

})

const spcificCopoun = catchError(async(req,res,next)=>{

    const copoun = await Copoun.findById(req.params.id)

    copoun || next(new appError('copoun Not Found' , 401))
    !copoun || res.status(201).json({message :"Success Get Spcific Copoun" , copoun});})

const updateCopoun = catchError(async(req,res,next)=>{

const copoun = await Copoun.findByIdAndUpdate(req.params.id,req.body , {new:true})
    copoun || next(new appError('copoun Not Found' , 401))
    !copoun || res.status(201).json({message :"Success Update Copoun" , copoun});
})

const deleteCopoun = catchError(async(req,res,next)=>{

const copoun = await Copoun.findByIdAndDelete(req.params.id)
    copoun || next(new appError('copoun Not Found' , 401))
    !copoun || res.status(201).json({message :"Success Deleted Copoun" , copoun});
})


export {
    addCopoun,
    allCopoun,
    spcificCopoun,
    updateCopoun,
    deleteCopoun
}