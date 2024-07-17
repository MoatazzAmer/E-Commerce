


export const validate = (schema)=>{
    return(req,res,next)=>{
        const {error} = schema.validate({image :req.file,...req.body , ...req.params ,...req.query} ,{abortEarly :false});
        if(!error){
            next()
        }else{
            res.json(error.message)
        }
    }
}