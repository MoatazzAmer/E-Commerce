import { Router } from "express";
import { addBrand, deleteBrand, getAllBrand, getOneBrand, updateBrand } from "./brand.controller.js";
import { validate } from "../../midleWare/validation.js";
import { addBrandVal, updateBrandVal } from "./brand.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";



const brantRouter =Router();


brantRouter
    .route('/')
        .post(uploadSingleFile('logo','brands'),validate(addBrandVal),addBrand).get(getAllBrand)

        brantRouter.route('/:id').get(getOneBrand).put(uploadSingleFile('logo','brands'),validate(updateBrandVal),updateBrand).delete(deleteBrand)
export default brantRouter