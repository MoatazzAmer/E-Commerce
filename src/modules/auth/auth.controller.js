import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from '../../utils/appError.js';



const signUp = catchError(async(req,res,next)=>{
    const user = new User (req.body);

    await user.save();
    let token =jwt.sign({userId : user._id , role : user.role} , process.env.SEKERT_KEY)
    res.status(201).json({message : "Success Register" , token});
});



const signIn = catchError(async(req,res,next)=>{

    const user = await User.findOne({email : req.body.email});
    if (!user || !bcrypt.compareSync(req.body.password , user.password)){
        return next(new appError('Incorrect Email Or Password' ,409))
    }
    let token =jwt.sign({userId : user._id , role : user.role} ,  process.env.SEKERT_KEY)
    res.status(201).json({message : "Success Login" , token});
});


const changePassword = catchError(async(req,res,next)=>{

    const user = await User.findOne({email : req.body.email}); 
    if(user && bcrypt.compareSync(req.body.oldPassword , user.password)){
        await User.findOneAndUpdate({email : req.body.email} , {password : req.body.newPassword , passwordChangedAt:Date.now()});
        let token = jwt.sign({userId:user._id , role:user.role} , process.env.SEKERT_KEY)
        res.status(201).json({message :"Success Change Password" , token})
    };
    return next(new appError("incorrect Email Or Password" ,401))
})


const protectedRoutes = catchError(async(req,res,next)=>{
    // 1- checek Token ? exists Or Not
    const {token} = req.headers;
    let userPlayLoad = null;
    if(!token) return next(new appError('Invalid Error' , 404));

    //2- verify Tken
    jwt.verify(token ,  process.env.SEKERT_KEY ,(err,playLoad)=>{
        if(err) return next(new appError(err , 401));

        userPlayLoad = playLoad;
    })

    // 3 - check user Id
    let user = await User.findById(userPlayLoad.userId);
    if(!user) return next(new appError('user Not Found',401));

    if(user.passwordChangedAt){
        const time = parseInt(user.passwordChangedAt.getTime() / 1000);
        // 4- token
        if(time > userPlayLoad.iat) return next(new appError('invalid Token ... login Again' , 401));
    }
    req.user = user 
    next()

})


const allowTo = (...roles)=> {
    return catchError(async(req,res,next)=>{
        if(roles.includes(req.user.role)) 
            return next()

        return next(new appError('You Not Authorized To Access This Endpoint' , 401))
        
    })
}
export{
    signUp,
    signIn,
    changePassword,
    protectedRoutes,
    allowTo
}