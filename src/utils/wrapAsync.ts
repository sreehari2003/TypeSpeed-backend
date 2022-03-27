import {Request,Response,NextFunction} from "express"

const wrapAsync = (fun) => {
    return function (req:Request, res:Response, next:NextFunction) {
      fun(req, res, next).catch(next);
    };
  };
  export default wrapAsync;