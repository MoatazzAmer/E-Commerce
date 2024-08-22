import { Router } from "express";
import { validate } from "../../midleWare/validation.js";
import { addProductVal, updateProductVal } from "./product.validation.js";
import { addProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";




const productRouter = Router();

productRouter.route('/')
    .post(protectedRoutes,allowTo('user'),uploadMixOfFiles(([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }])),validate(addProductVal),addProduct).get(getAllProducts)

productRouter.route('/:id')
    .get(getOneProduct).put(protectedRoutes,allowTo('user'),uploadMixOfFiles(([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }])),validate(updateProductVal),updateProduct).delete(protectedRoutes,allowTo('user','admin'),deleteProduct)
export{productRouter}