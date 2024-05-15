import express from "express";
import { authRouteData } from "../../constants/routeData.js";
const router = express.Router();

Object.entries(authRouteData).forEach(([method, values]) => {
  values.bodyRequest.forEach((arraysInsideBodyRequest, i) => {
    router[method](values.urls[i], arraysInsideBodyRequest);
  });
});

export default router;
