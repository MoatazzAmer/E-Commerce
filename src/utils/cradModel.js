import { Product } from "../../database/models/productmodel.js";
import { catchError } from "../midleWare/catchError.js";
import { appError } from "./appError.js";



export const deleteOne = (schema)=>{
    return catchError(async(req,res,next)=>{
        const product = await schema.findByIdAndDelete(req.params.id);
    
        product || next(new appError('Product Not Found' , 401));
        !product || res.status(201).json({message :'Success Deleted' ,product})
    })
};

export const  getAll =(schema)=>{
    return catchError(async(req,res,next)=>{


        const brands = await schema.find();
    
        brands ||  next(new appError('brand Not Found' , 401));
        !brands || res.status(201).json({message :'Success Get All Brands',brands})
    })
}