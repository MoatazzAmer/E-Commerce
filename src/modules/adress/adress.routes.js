import { Router } from "express";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAdress, deleteAdress, getLogedAdress } from "./adress.controller.js";



const adressRouter = Router();

adressRouter.patch("/" ,protectedRoutes , allowTo('user'),addAdress)
adressRouter.delete("/:id" ,protectedRoutes , allowTo('user','admin'),deleteAdress);
adressRouter.get("/",protectedRoutes,allowTo('user','admin'),getLogedAdress)

export default adressRouter