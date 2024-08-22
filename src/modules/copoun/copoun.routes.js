import { Router } from "express";
import { addCopoun, allCopoun, deleteCopoun, spcificCopoun, updateCopoun } from "./copoun.controller.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";




const copounRouter = Router();

copounRouter.use(protectedRoutes,allowTo('admin'))
copounRouter.route('/')
        .post(addCopoun)
        .get(allCopoun)
copounRouter.route('/:id')
        .get(spcificCopoun)
        .put(updateCopoun)
        .delete(deleteCopoun)

export default copounRouter