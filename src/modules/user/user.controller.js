import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";
import { deleteOne, getAll } from '../../utils/cradModel.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
import { User } from "../../../database/models/user.model.js";



const addUser = catchError(async(req,res,next)=>{

    const user = new User(req.body);

    await user.save()
    user.password = undefined
    res.status(201).json({message : 'Success Addded' , user})
});

const getOneUser = catchError(async(req,res,next)=>{


    const user = await User.findById(req.params.id);

    user ||  next(new appError('User Not Found' , 401));
    !user || res.status(201).json({message :'Success Get One User',user})
})


const getAllUser = catchError(async(req,res,next)=>{
    
    let apiFeatures = new ApiFeatures(User.find(), req.query)
    .pagination().filter().fields().sort().search()
    const users = await apiFeatures.mongooseQuery

    res.status(201).json({message :'Success Get All Products' ,page : apiFeatures.pageNumber,users})
})

const updateUser = catchError(async(req,res,next)=>{


    const user = await User.findByIdAndUpdate(req.params.id , req.body , {new : true});

    user ||  next(new appError('User Not Found' , 401));
    !user || res.status(201).json({message :'Success Updated',user})
})


const deleteUser = deleteOne(User);


export{
    addUser,
    getOneUser,
    getAllUser,
    updateUser,
    deleteUser
}