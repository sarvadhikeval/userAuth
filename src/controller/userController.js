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
            var token = await jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: '30m' });
        }
        else {
            throw new errHelper(errorTypes.not_found, 'User & password not match');
        }
        let tokenStore = await Token.findOne({
            where: {
                UserId: obj.id
            }
        });
        if (tokenStore) {
            tokenStore.token = token;
            await tokenStore.save();
        } else {
            tokenStore = await Token.create({ token, UserId: obj.id },{returning : true});
        }
        return SUCCESS(req, res, tokenStore.token);
    } catch (err) {
        console.log(err)
        next(err);
    }
}

export const userProfile = async (req, res, next) => {
    try {
        const {id} = req.user
        const findUser = await User.findByPk(id);
        if (findUser) return SUCCESS(req, res, req.user);
        else throw new errHelper(errorTypes.not_found, 'User not found');
    } catch (err) {
        next(err)
    }
}

export const userUpdate = async (req, res, next) => {
    try {
        const {id} = req.user
        const findUser = await User.findByPk(id);
        if (!findUser) throw new errHelper(errorTypes.not_found, 'User not found');
        const updateData = await User.update(req.body, {
            where: { id }
        });

        return SUCCESS(req, res, updateData)
    } catch (err) {
        return next(err);
    }
}

export const userDelete = async (req, res, next) => {
    try {
        const {id,password} = req.user;

        const findUser = await User.findByPk(id);
        if (!findUser) throw new errHelper(errorTypes.not_found, 'User not found');

        const deleteData = await User.destroy({
            where: { id }
        });

        return SUCCESS(req, res, deleteData);
    } catch (err) {
        return next(err)
    }
}