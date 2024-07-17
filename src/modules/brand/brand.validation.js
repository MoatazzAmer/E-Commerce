import Joi from "joi";



const addBrandVal = Joi.object({
    name : Joi.string().min(2).max(15).required(),
    loga : Joi.string(),
    
});

const updateBrandVal = Joi.object({
    name : Joi.string().min(2).max(15).required(),
    loga : Joi.string(),
    id: Joi.string().required()
});


export {
    addBrandVal,
    updateBrandVal
}