import { Router } from "express";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToWishList, getLogedWishList, removeFromWishList } from "./wishList.controller.js";



const wishListRouter = Router();


wishListRouter.patch('/',protectedRoutes , allowTo('user') , addToWishList)
wishListRouter.delete('/:id' , protectedRoutes , allowTo('user','admin') , removeFromWishList)
wishListRouter.get('/',protectedRoutes, allowTo('user'),getLogedWishList)


export default wishListRouter