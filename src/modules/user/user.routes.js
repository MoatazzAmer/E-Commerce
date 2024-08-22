import { Router } from "express";
import { addUser, deleteUser, getAllUser, getOneUser, updateUser } from "./user.controller.js";
import { checkEmailExists } from "../../midleWare/checkEmailExists.js";
import orderRouter from "../order/order.routes.js";




const userRouter = Router();

userRouter.use('/:user/order',orderRouter)

userRouter.post('/add-user' ,checkEmailExists, addUser);
userRouter.get('/:id',getOneUser)
userRouter.get('/',getAllUser);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser)



export default userRouter