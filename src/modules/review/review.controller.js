import { Review } from "../../../database/models/revew.model.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";



const addReview = catchError(async(req,res,next)=>{
    req.body.user = req.user._id
    const isExists = await Review.findOne({user : req.user._id , product : req.body.product});
    if(isExists) return next(new appError('You Aleardy Review Befor',401))
    const review = new Review(req.body );
    await review.save();
    res.status(201).json({message : "Success  .." , review})
})


const getReview = catchError(async(req,res,next)=>{
    const review = await Review.findById(req.params.id)
    review || next(new appError('review Not Found',401))
    !review || res.status(201).json({message : "Success  .." , review})})

const getAllReview = catchError(async(req,res,next)=>{
    const review = await Review.find()
    review || next(new appError('review Not Found',401))
    !review || res.status(201).json({message : "Success  .." , review})
})

const updateReview = catchError(async(req,res,next)=>{

    const review = await Review.findOneAndUpdate({_id :req.params.id , user : req.user._id} , req.body , {new :true})
    review || next(new appError('review Not Found or you not authorized',401))
    !review || res.status(201).json({message : "Success updated  .." , review})
})


const deleteReview = catchError(async(req,res,next)=>{
    const review = await Review.findOneAndDelete({_id :req.params.id , user : req.user._id} )
    review || next(new appError('review Not Found or you not authorized',401))
    !review || res.status(201).json({message : "Success Deleted  .." , review})

})


export{
    addReview,
    getReview,
    getAllReview,
    updateReview,
    deleteReview
}