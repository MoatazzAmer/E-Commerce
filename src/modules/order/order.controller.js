import { Cart } from "../../../database/models/cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/productmodel.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";





const createCashOrder = catchError(async(req,res,next)=>{
    //1-get user cart
    let cart = await Cart.findById(req.params.id);
    if(!cart) return next(new appError('cart Not Found',404))
    //2-total order price
    let totalOrderPrice = cart.totalCartPriceAfterNumber || cart.totalCartPrice;
    //3-create order
    let order = new Order({
        user : req.user._id,
        cartItems : cart.cartItems,
        shippingAdress : req.body.shippingAdress,
        totalOrderPrice : totalOrderPrice
    });
    await order.save()
    //4-increment Sold && decrement stock
    let option = cart.cartItems.map((prod)=>{
        return(
            {
                updateOne:{
                    "filter":{_id :prod.product},
                    "update":{$inc : {sold: prod.quantity, stock : -prod.quantity}}
                }
            }
        )
    });
    await Product.bulkWrite(option)
    //5-clear user cart
    await Cart.findByIdAndDelete(cart._id)

    res.status(201).json({message :"Success", order})
});;

const getUserOrder = catchError(async(req,res,next)=>{
    const order = await Order.findOne({user :req.user._id}).populate('orderItems.product');
    order || next(new appError('order Not Found' ,401))
    !order || res.status(201).json({message :"Success",order})
})

const getAllUserOrder = catchError(async(req,res,next)=>{
    let filter ={};
    if(req.params.user) filter.user = req.params.user
    const order = await Order.find(filter);
    order || next(new appError('order Not Found' ,401))
    !order || res.status(201).json({message :"Success",order})
})
export{
    createCashOrder,
    getUserOrder,
    getAllUserOrder
}