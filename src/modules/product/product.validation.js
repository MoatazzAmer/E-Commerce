import Joi from "joi";



const addProductVal = Joi.object({
    title : Joi.string().min(2).required(),
    description : Joi.string().min(30).max(3000).required(),
    imageCover : Joi.string(),
    images : Joi.string(),
    price : Joi.number().min(0).required(),
    priceAfterDiscount : Joi.number().min(0).required(),
    sold : Joi.number(),
    stock : Joi.number().min(0),
    brand : Joi.string().required(),
    catogery : Joi.string().required(),
    subCatogery : Joi.string().required()

});

const updateProductVal = Joi.object({
    title : Joi.string().min(2).required(),
    description : Joi.string().min(30).max(3000).required(),
    imageCover : Joi.string(),
    images : Joi.string(),
    price : Joi.number().min(0).required(),
    priceAfterDiscount : Joi.number().min(0).required(),
    sold : Joi.number(),
    stock : Joi.number().min(0),
    brand : Joi.string().required(),
    catogery : Joi.string().required(),
    subCatogery : Joi.string().required(),
    id : Joi.string()
});


export {
    addProductVal,
    updateProductVal
}