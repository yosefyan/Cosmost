import errorCreater from "../helpers/errorCreater.js";
import { objectIdValidationAdapter } from "../validation/validationAdapter.js";

const paramsMiddleware = async (req, res, next) => {
  try {
    const { id, username } = req.params;
    await objectIdValidationAdapter(id, username);
    next();
  } catch (err) {
    errorCreater(res, 400, err.message);
  }
};

export default paramsMiddleware;
