import { config } from "dotenv";
import express from "express";
import sequelize from "./config/sequelize.js";
import User from "./models/User.js";
import Token from "./models/Token.js";
import route from './routes/index.js'
import passportUser from "./middleware/userAuth.js";
import session from 'express-session'
import passport  from "passport";
import errorHandling from "./middleware/errorHandling.js";

config();
const server = express();
server.use(express.urlencoded());

server.use(session({
    name : 'user',
    secret : 'userSession',
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 100*1000
    }
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(route);

server.use(errorHandling)

server.listen(process.env.PORT);