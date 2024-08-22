import { Router } from "express";
import { createCashOrder, getAllUserOrder, getUserOrder } from "./order.controller.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";


const orderRouter = Router();



orderRouter.post('/:id',protectedRoutes,allowTo('user'),createCashOrder)
orderRouter.get('/user' ,protectedRoutes,allowTo('user','admin'),getUserOrder)
orderRouter.get('/' ,protectedRoutes,allowTo('admin'),getAllUserOrder)



export default orderRouter