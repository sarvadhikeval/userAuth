import statusCode from "../constant/statusCode.js"

export const SUCCESS = (req,res,data)=>{
    return res.status(statusCode.SUCCESS).json({
        status_code : statusCode.SUCCESS,
        data,
        message : 'Operation successfully done'
    });
}