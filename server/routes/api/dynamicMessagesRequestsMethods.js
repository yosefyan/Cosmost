import express from "express";
import { messagesRouteData } from "../../constants/routeData.js";
const router = express.Router();

Object.entries(messagesRouteData).forEach(([method, values]) => {
  values.bodyRequest.forEach((arraysInsideBodyRequest, i) => {
    router[method](values.urls[i], arraysInsideBodyRequest);
  });
});

export default router;
