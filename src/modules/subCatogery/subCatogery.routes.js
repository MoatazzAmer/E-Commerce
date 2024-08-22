import { Router } from "express";
import { validate } from "../../midleWare/validation.js";
import { addSubCatVal, updateSubCatValidation } from "./subCatogery.validation.js";
import { addSubCatogery, deleteSubCatogery, getAllSubCatogery, getOneSubCatogery, updateSubCatogery } from "./subCatogery.controller.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";


const subCatRouter = Router({mergeParams : true});



subCatRouter
    .route('/')
        .post(protectedRoutes,allowTo('user'),validate(addSubCatVal),addSubCatogery)
        .get(getAllSubCatogery)

subCatRouter.route('/:id')
    .get(getOneSubCatogery)
    .put(protectedRoutes,allowTo('user'),validate(updateSubCatValidation),updateSubCatogery)
    .delete(protectedRoutes,allowTo('user','admin'),deleteSubCatogery)

export default subCatRouter