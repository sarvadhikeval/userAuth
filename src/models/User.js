import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";


const User = sequelize.define('User',{
    id :{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    username : {
        type : DataTypes.STRING,
        unique : {
            msg : 'Username must be unique'
        },
        allowNull : false,
    },
    email :{
        type : DataTypes.STRING,
        unique : {
            msg : 'Email must be unique'
        },
        allowNull : false,
        validate : {
            isEmail : {
                msg : 'Email not valid'
            }
        }
    },
    password :{
        type : DataTypes.STRING,
        allowNull : false,
        validate :{
            len :{
                args : [7.14],
                msg : 'Password must be 7 & 14 char between'
            }
        }
    }
});


export default User;