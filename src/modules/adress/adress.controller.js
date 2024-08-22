import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";





const addAdress = catchError(async(req,res,next)=>{

    const adress = await User.findOneAndUpdate(req.user._id,
        {$push : {adresses : req.body}}, {new:true});

    adress || next(new appError('adress Not Found',404));
    !adress || res.status(201).json({message :'Add New Adress' , adress})

});

const deleteAdress = catchError(async(req,res,next)=>{

    const adress = await User.findOneAndUpdate(req.user._id,
        {$pull : {adresses : {_id:req.params.id}}}, {new:true});

    adress || next(new appError('adress Not Found',404));
    !adress || res.status(201).json({message :'Delete Adress' , adress})

});

const getLogedAdress =catchError(async(req,res,next)=>{

    const adress = await User.findById(req.user._id);

    adress || next(new appError('adress Not Found',404));
    !adress || res.status(201).json({message :'All Adress' , adress:adress.adresses})

});
export {
    addAdress,
    deleteAdress,
    getLogedAdress
}