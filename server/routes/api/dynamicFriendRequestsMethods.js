import express from "express";
import { friendRequestsData } from "../../constants/routeData.js";
const router = express.Router();

Object.entries(friendRequestsData).forEach(([method, values]) => {
  values.bodyRequest.forEach((arraysInsideBodyRequest, i) => {
    router[method](values.urls[i], arraysInsideBodyRequest);
  });
});

export default router;
