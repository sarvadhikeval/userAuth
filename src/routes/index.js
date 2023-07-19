import { Router } from "express";
import * as userController from "../controller/userController.js";
import passport from "passport";
const route = Router();

route.post('/register',userController.userRegister);

route.post('/login', userController.userLogin);

route.get('/user/:id',passport.authenticate('userAuthorization'),userController.userDelete);

export default route;