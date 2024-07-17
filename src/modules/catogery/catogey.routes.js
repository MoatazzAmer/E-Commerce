import { Router } from "express";
import { addCatogery, deleteCatogery, getAllCatogery, getOneCatogery, updateCatogery } from "./catoger.controller.js";
import { validate } from "../../midleWare/validation.js";
import {  addCatVal, updateCatVal } from "./catogery.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";




const catRouter = Router();

catRouter
    .route('/')
        .post(uploadSingleFile('image','catogries'),validate(addCatVal),addCatogery).get(getAllCatogery)

catRouter.route('/:id').get(getOneCatogery).put(uploadSingleFile('image','catogries'),validate(updateCatVal),updateCatogery).delete(deleteCatogery)
export default catRouter;