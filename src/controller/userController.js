import { compare, hash } from "bcrypt";
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import { SUCCESS } from '../middleware/responseHandling.js'
import Token from "../models/Token.js";
import { Op } from "sequelize";
import { config } from "dotenv";
import errHelper from "../utils/errorHelpers.js";
import errorTypes from "../utils/errorTypes.js";
config();
export const userRegister = async (req, res, next) => {
    try {
        req.body.password = await hash(req.body.password, 10);
        const userInsert = await User.create(req.body);
        return SUCCESS(req, res, userInsert);
    } catch (err) {
        next(err)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const findUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: username }
                ]
            }
        });

        if (findUser && await compare(password, findUser.password)) {
            let { id, username, email } = findUser;
            var obj = { id, username, email }
            var token = await jwt.sign(obj, process.env.JWT_SECRET,{expiresIn : 1800});
        }
        else {
            console.log('not match')
        }
        const findToken = await Token.findOne({
            where: {
                UserId: obj.id
            }
        });
        var tokenStore = '';
        if (findToken) {
            tokenStore = findToken.token = token;
            findToken.save();
        } else {
            tokenStore = await Token.create({ token: token, UserId: obj.id }, { returning: { token } });
        }
        return res.json({ token: tokenStore });
    } catch (err) {
        next(err);
    }
}

export const userDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const findUser = await User.findByPk(id);
        if(findUser) return SUCCESS(req,res,findUser);
        else throw new errHelper(errorTypes.not_found,'User not found');
    } catch (err) {
        next(err)
    }
}