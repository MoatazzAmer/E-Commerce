import { Router } from "express";
import { addBrand, deleteBrand, getAllBrand, getOneBrand, updateBrand } from "./brand.controller.js";
import { validate } from "../../midleWare/validation.js";
// import { addBrandVal, updateBrandVal } from "./brand.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";



const brantRouter =Router();


brantRouter
    .route('/')
        .post(protectedRoutes,allowTo('user'),uploadSingleFile('logo','brands'),addBrand).get(getAllBrand)

        brantRouter.route('/:id').get(getOneBrand).put(protectedRoutes,allowTo('user'),uploadSingleFile('logo','brands'),updateBrand).delete(deleteBrand)
export default brantRouter