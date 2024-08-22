import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";




const addToWishList = catchError(async(req,res,next)=>{
    const wishList = await User.findOneAndUpdate(req.user._id ,
        {$addToSet : {wishList : req.body.product}}, {new : true});
    wishList ||  next(new appError('WishList Not Found' , 404))
    !wishList || res.status(201).json({message:"Success Added woshList" , wishList:wishList.wishList})
})


const removeFromWishList = catchError(async(req,res,next)=>{
    const wishList = await User.findOneAndUpdate(req.user._id ,
        {$pull : {wishList : req.params.id}}, {new : true});
    wishList ||  next(new appError('WishList Not Found' , 404))
    !wishList || res.status(201).json({message:"Success Deleted wishList" , wishList:wishList.wishList})
})



const getLogedWishList = catchError(async(req,res,next)=>{
    const wishList = await User.findById(req.user._id ).populate('wishList');

    wishList ||  next(new appError('WishList Not Found' , 404))
    !wishList || res.status(201).json({message:"Get all WishList" , wishList:wishList.wishList})
})

export {
    addToWishList,
    removeFromWishList,
    getLogedWishList
}