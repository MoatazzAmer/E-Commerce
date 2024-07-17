import { Router } from "express";
import { validate } from "../../midleWare/validation.js";
import { addSubCatVal, updateSubCatValidation } from "./subCatogery.validation.js";
import { addSubCatogery, deleteSubCatogery, getAllSubCatogery, getOneSubCatogery, updateSubCatogery } from "./subCatogery.controller.js";


const subCatRouter = Router();



subCatRouter
    .route('/')
        .post(validate(addSubCatVal),addSubCatogery)
        .get(getAllSubCatogery)

subCatRouter.route('/:id')
    .get(getOneSubCatogery)
    .put(validate(updateSubCatValidation),updateSubCatogery)
    .delete(deleteSubCatogery)

export default subCatRouter