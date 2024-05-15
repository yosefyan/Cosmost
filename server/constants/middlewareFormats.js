import authMiddleware from "../middlewares/authMiddleware.js";
import paramsMiddleware from "../middlewares/paramsMiddleware.js";
import dynamicRoleMiddleware from "../middlewares/dynamicRoleMiddleware.js";

const middlewaresFormat = (schemas) => ({
  paramsAdminMiddleware: [
    authMiddleware,
    paramsMiddleware,
    dynamicRoleMiddleware(["isAdmin"], schemas),
  ],
});

export default middlewaresFormat
