import { config } from "dotenv";
import { Sequelize } from "sequelize";
config();
const {DB_NAME,DB_USERNAME,DB_PASSWORD,DB_PORT} = process.env;

const sequelize = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    dialect : "postgres",
    port : DB_PORT,
    host : 'localhost',
    logging : false
});
sequelize.sync({alter : true});

export default sequelize;