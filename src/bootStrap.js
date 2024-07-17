import catRouter from "./modules/catogery/catogey.routes.js"
import subCatRouter from "./modules/subCatogery/subCatogery.routes.js";
import brandRouter from "./modules/brand/brand.routes.js"
import { productRouter } from "./modules/product/product.routes.js";


export const bootStrap =(app)=>{



    app.use('/catogery',catRouter);
    app.use('/subcatogery',subCatRouter);
    app.use('/brand' , brandRouter);
    app.use('/product', productRouter)


}