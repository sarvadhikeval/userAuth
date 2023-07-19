import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./User.js";


const Token = sequelize.define('Token',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    token :{
        type : DataTypes.STRING,
        allowNull : false
    }
});

User.hasOne(Token);

export default Token;