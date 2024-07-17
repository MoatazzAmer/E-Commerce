import express from 'express';
import { dbConn } from './database/dbConnextion.js';
import { globalError } from './src/midleWare/globalError.js';
import { appError } from './src/utils/appError.js';
import { bootStrap } from './src/bootStrap.js';



const app = express();
app.use(express.json())
app.use('/uploads',express.static('uploads'))




bootStrap(app)
app.use('*',(req,res,next)=>{
    next(new appError('Route Not Found ', 404))
})
app.use(globalError)
app.listen(3000,()=>{
    console.log('Server Running In port 3000');
})