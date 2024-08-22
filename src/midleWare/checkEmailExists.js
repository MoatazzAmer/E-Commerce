import { User } from "../../database/models/user.model.js";
import { appError } from "../utils/appError.js";
import { catchError } from "./catchError.js";


export const checkEmailExists = catchError(async(req,res,next)=>{
    const checkEmail = await User.findOne({email :  req.body.email});
    if(checkEmail) return next(new appError('Email Aleardy Exists' , 409));
    next();
})