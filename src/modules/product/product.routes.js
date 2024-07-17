import { Router } from "express";
import { validate } from "../../midleWare/validation.js";
import { addProductVal, updateProductVal } from "./product.validation.js";
import { addProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";




const productRouter = Router();

productRouter.route('/')
    .post(uploadMixOfFiles(([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }])),validate(addProductVal),addProduct).get(getAllProducts)

productRouter.route('/:id')
    .get(getOneProduct).put(uploadMixOfFiles(([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }])),validate(updateProductVal),updateProduct).delete(deleteProduct)
export{productRouter}