import { Router } from "express";
import * as userController from "../controller/userController.js";
import passport from "passport";
const route = Router();

route.post('/register',userController.userRegister);

route.post('/login', userController.userLogin);

route.get('/user',passport.authenticate('userAuthorization',{session : false}),userController.userProfile);

route.put('/update',passport.authenticate('userAuthorization',{session : false}),userController.userUpdate);

route.delete('/delete',passport.authenticate('userAuthorization',{session :false}),userController.userDelete);

export default route;