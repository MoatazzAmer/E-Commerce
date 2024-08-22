import { Router } from "express";
import { checkEmailExists } from "../../midleWare/checkEmailExists.js";
import { changePassword, signIn, signUp } from "./auth.controller.js";




const authRouter = Router();

authRouter.post('/signup',checkEmailExists,signUp);
authRouter.post('/signin',signIn);
authRouter.patch('/changepassword', changePassword);


export default authRouter;