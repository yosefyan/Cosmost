import { connectToMongo } from "../MongoDB/dbConnect.js";
import { currentDB } from "../../constants/currentAdapter.js";
import {
  getDataController,
  createDataController,
  updateDataController,
  deleteDataController,
} from "../../controllers/dynamicController.js";
import dynamicNormalize from "../../normalize/dynamicNormalize.js";

const dynamicAdapter = (mongoMethod) => {
  return async (_, res) => {
    try {
      if (currentDB === "MongoDB") {
        return mongoMethod;
      }
    } catch (error) {}
    return res.status(500).json("Internal Server Error");
  };
};

const connectToDB = dynamicAdapter(connectToMongo());

const getData = (collectionType, identifier) => {
  return async (req, res) => {
    dynamicAdapter(getDataController({ collectionType, identifier })(req, res));
  };
};

const createData = (collectionType) => {
  return async (req, res) => {
    req.body = dynamicNormalize(collectionType, req.body);
    dynamicAdapter(
      createDataController({ collectionType, data: req.body })(req, res)
    );
  };
};

const updateData = (collectionType, updateSpecific, data) => {
  return async (req, res) => {
    if (req.body) {
      updateSpecific = { ...req.body };
    }
    if (!updateSpecific) req.body = dynamicNormalize(collectionType, req.body);
    dynamicAdapter(
      updateDataController({
        collectionType,
        identifier: req.params.id || req.userData._id,
        updateSpecific,
        data: data || req.body,
      })(req, res)
    );
  };
};

const deleteData = (collectionType) => {
  return async (req, res) => {
    dynamicAdapter(
      deleteDataController({ collectionType, identifier: req.params.id })(
        req,
        res
      )
    );
  };
};

export { connectToDB, createData, getData, updateData, deleteData };
export default dynamicAdapter;
