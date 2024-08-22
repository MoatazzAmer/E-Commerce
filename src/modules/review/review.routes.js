import { allowTo, protectedRoutes } from "../auth/auth.controller.js";
import { addReview, deleteReview, getAllReview, getReview, updateReview } from "./review.controller.js";

import { Router } from "express";



const reviewRouter = Router();

reviewRouter.post('/',protectedRoutes,allowTo('user'),addReview)
reviewRouter.get('/',getAllReview)
reviewRouter.get('/:id',getReview)

reviewRouter.put('/:id',protectedRoutes,allowTo('user') , updateReview);
reviewRouter.delete('/:id' , protectedRoutes,allowTo('user','admin') , deleteReview)

export default reviewRouter