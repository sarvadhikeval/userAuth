import statusCode from "../constant/statusCode.js";
import errorTypes from "../utils/errorTypes.js";

const errorResponse = (err,req,res)=>{
    return res.status(err.statusCode).json({
        statusCode : err.statusCode,
        message : err.message
    });
}


export default (err,req,res,next)=>{
    switch(err.name){
        case errorTypes.bad_request:
            err.statusCode = statusCode.BAD_REQUEST
            return errorResponse(err,req,res);

        case errorTypes.unauthorized:
            err.statusCode = statusCode.UNAUTHORIZED;
            return errorResponse(err,req,res);

        case errorTypes.not_found:
            err.statusCode = statusCode.NOT_FOUND;
            return errorResponse(err,req,res);

        default :
            err.statusCode = statusCode.BAD_REQUEST;
            return errorResponse(err,req,res);
    }
}