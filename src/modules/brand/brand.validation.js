import Joi from "joi";



const addBrandVal = Joi.object({
    name : Joi.string().min(2).max(15).required(),
    logo : Joi.object({
        filename : Joi.string().required(),
        originalname :Joi.string().required(),
        encoding :Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg' ,'image/png').required(),
        size : Joi.number().max(5242880).required(),
        destination :Joi.string().required(),
        filename : Joi.string().required(),
        path :Joi.string().required()
    }).required(),
    
});

const updateBrandVal = Joi.object({
    name : Joi.string().min(2).max(15).required(),
    logo : Joi.object({
        filename : Joi.string().required(),
        originalname :Joi.string().required(),
        encoding :Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg' ,'image/png').required(),
        size : Joi.number().max(5242880).required(),
        destination :Joi.string().required(),
        filename : Joi.string().required(),
        path :Joi.string().required()
    }).required(),
    id: Joi.string().required()
});


export {
    addBrandVal,
    updateBrandVal
}