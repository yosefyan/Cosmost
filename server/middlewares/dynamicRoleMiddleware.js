import Posts from "../models/MongoDB/Collections/Schemas/Posts.js";
import errorCreater from "../helpers/errorCreater.js";
import { getInstance } from "../models/MongoDB/Collections/dynamicService.js";

const dynamicRoleMiddleware = (rolesArray, schemas) => {
  return async (req, res, next) => {
    try {
      console.log("schemas", schemas);
      const roleMatcher = rolesArray.every((role) => req.userData[role]);
      const selfParamsUser = req.params.id === req.userData._id;
      console.log(schemas.modelName);
      const getSchemaObject = await getInstance({
        collectionType: schemas || Posts,
        identifier:
          schemas.modelName === "notifications"
            ? "originalOwner"
            : schemas.modelName === "rooms"
            ? "sender"
            : "user_id",
        value: req.userData._id,
      });
      const isOwnerOfObject =
        getSchemaObject[0] &&
        getSchemaObject[0][
          schemas.modelName === "notifications"
            ? "originalOwner"
            : schemas.modelName === "rooms"
            ? "sender"
            : "user_id"
        ].toString() === req.userData._id;
      console.log("rolematcher", roleMatcher);
      console.log("selfParamsUser", selfParamsUser);
      console.log("isOwnerOfObject", isOwnerOfObject);
      if (Object.keys(req.body).length === 1) {
        if (!roleMatcher && !selfParamsUser && !isOwnerOfObject)
          return res.status(403).json("Insufficient privileges");
      } else {
        if (!roleMatcher && !selfParamsUser && !isOwnerOfObject) {
          return res.status(403).json("Insufficient privileges");
        }
      }
      req.id = req.params.id;

      next();
    } catch (err) {
      errorCreater(res, 400, err.message);
    }
  };
};

export default dynamicRoleMiddleware;
