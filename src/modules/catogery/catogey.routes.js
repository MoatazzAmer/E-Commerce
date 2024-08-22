import { Router } from "express";
import { addCatogery, deleteCatogery, getAllCatogery, getOneCatogery, updateCatogery } from "./catoger.controller.js";
import { validate } from "../../midleWare/validation.js";
import {  addCatVal, updateCatVal } from "./catogery.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import subCatRouter from "../subCatogery/subCatogery.routes.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";




const catRouter = Router();

catRouter.use('/:catogery/subcatogeries',subCatRouter);
catRouter
        .route('/')
        .post(protectedRoutes,allowTo('user','admin'),uploadSingleFile('image','catogries'),validate(addCatVal),addCatogery)
        .get(getAllCatogery)

catRouter.route('/:id').get(getOneCatogery)
        .put(protectedRoutes,allowTo('admin'),uploadSingleFile('image','catogries'),validate(updateCatVal),updateCatogery)
        .delete(protectedRoutes ,deleteCatogery)
export default catRouter;