import Joi from "joi";



const addSubCatVal = Joi.object({
    name : Joi.string().min(2).max(15).required(),
    catogery : Joi.string().required(),

});



const updateSubCatValidation = Joi.object({
    name : Joi.string().min(2).max(15).required(),
    id: Joi.string().required()
});


export {
    addSubCatVal,
    updateSubCatValidation
}