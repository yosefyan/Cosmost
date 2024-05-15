import { verifyToken } from "../helpers/tokenServices.js";
import errorCreater from "../helpers/errorCreater.js";

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers["token"]) throw new Error("token not found");
    const payload = await verifyToken(req.headers["token"]);
    req.userData = payload;
    next();
  } catch (err) {
    errorCreater(res, 401, err.message);
  }
};

export default authMiddleware;
