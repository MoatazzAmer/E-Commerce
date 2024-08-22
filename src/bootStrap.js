import catRouter from "./modules/catogery/catogey.routes.js"
import subCatRouter from "./modules/subCatogery/subCatogery.routes.js";
import brandRouter from "./modules/brand/brand.routes.js"
import { productRouter } from "./modules/product/product.routes.js";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import reviewRouter from "./modules/review/review.routes.js";
import wishListRouter from "./modules/wishList/wishList.routes.js";
import adressRouter from "./modules/adress/adress.routes.js";
import copounRouter from "./modules/copoun/copoun.routes.js";
import { cartRouter } from "./modules/catr/cart.router.js";
import orderRouter from "./modules/order/order.routes.js";


export const bootStrap =(app)=>{



    app.use('/catogery',catRouter);
    app.use('/subcatogery',subCatRouter);
    app.use('/brand' , brandRouter);
    app.use('/product', productRouter)
    app.use('/user',userRouter)
    app.use('/auth',authRouter)
    app.use('/review',reviewRouter);
    app.use('/wishlist' , wishListRouter);
    app.use('/adress' , adressRouter);
    app.use('/copoun' ,copounRouter);
    app.use('/cart',cartRouter);
    app.use('/order',orderRouter)
}