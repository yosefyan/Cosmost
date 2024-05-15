import errorCreater from "../helpers/errorCreater.js";

const errorMiddleware = async (err, req, res, next) => {
  return errorCreater(res, 404, err.message);
};

export default errorMiddleware;
