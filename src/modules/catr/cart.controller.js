import { Cart } from "../../../database/models/cart.model.js";
import { Copoun } from "../../../database/models/copoun.model.js";
import { Product } from "../../../database/models/productmodel.js";
import { catchError } from "../../midleWare/catchError.js";
import { appError } from "../../utils/appError.js";

function calcTotalPrice(isCartExists){
    isCartExists.totalCartPrice= isCartExists.cartItems.reduce((prev , item)=> prev += item.quantity * item.price ,0)

    if(isCartExists.disCount)
    isCartExists.totalCartPriceAfterDiscount = 
    isCartExists.totalCartPrice - (isCartExists.totalCartPrice * isCartExists.disCount) /100
}
const addToCart = catchError(async(req,res,next)=>{
    const isCartExists = await Cart.findOne({user : req.user._id});
    let product = await Product.findById(req.body.product)
    if(!product) return next (new appError('product not Found' ,40));
    req.body.price = product.price
    if(req.body.quantity > product.stock) return next (new appError('sold out' ,40))
    if(!isCartExists) {
        const cart = new Cart({
            user : req.user._id,
            cartItems : [req.body],
        })
        calcTotalPrice(cart)
        await cart.save();
        res.status(201).json({message :"Success Added Cart",cart})
    }else {
        let item = isCartExists.cartItems.find(item => item.product == req.body.product);
        if(item) {
            item.quantity += req.body.quantity || 1
            if(item.quantity > product.stock) return next (new appError('sold out' ,40))
        }
        if(!item) isCartExists.cartItems.push(req.body);
        calcTotalPrice(isCartExists)
        await isCartExists.save()
        res.status(201).json({message :"Success" ,cart : isCartExists   })
    }
});


const updateQuantity = catchError(async(req,res,next)=>{

    const cart = await Cart.findOne({user:req.user._id});

    let item = cart.cartItems.find(item=> item.product == req.params.id);
    if(!item) return next(new appError('Product Not Fount' ,401));
    
    item.quantity = req.body.quantity;
    await cart.save()

    res.status(201).json({message :"Success" , cart})
})

let removeProduct = catchError(async(req,res,next)=>{
    const cart = await Cart.findOneAndUpdate({user : req.user._id} ,
        {$pull :{cartItems : {_id:req.params.id}}} , {new : true}
    );
    calcTotalPrice(cart);
    await cart.save()
    cart || next(new appError('product not found' ,401))
    !cart || res.status(201).json({message :"Success Deleted",cart})
})

let getloogedusercart = catchError(async(req,res,next)=>{
    const cart = await Cart.findOne({user:req.user._id})
    cart || next(new appError('product not found' ,401))
    !cart || res.status(201).json({message :"Success Deleted",cart})
})
let clearCart = catchError(async(req,res,next)=>{
    const cart = await Cart.findOneAndDelete({user:req.user._id})
    cart || next(new appError('product not found' ,401))
    !cart || res.status(201).json({message :"Success Deleted",cart})
})

const applyCopon = catchError(async(req,res,next)=>{
    const copon = await Copoun.findOne({code:req.body.code , expire : {$gte : Date.now()}})
    if(!copon) return next(new appError('Opps Copoun Inalid',401));
    const cart = await Cart.findOne({user:req.user._id});

    cart.disCount = copon.disCount

    await cart.save();
    res.status(201).json({message:"Success" , cart})
})
export {
    addToCart,
    updateQuantity,
    removeProduct,
    getloogedusercart,
    clearCart,
    applyCopon
}