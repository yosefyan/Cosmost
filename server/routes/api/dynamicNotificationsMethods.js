import express from "express";
import { notificationsRouteData } from "../../constants/routeData.js";
const router = express.Router();

Object.entries(notificationsRouteData).forEach(([method, values]) => {
  values.bodyRequest.forEach((arraysInsideBodyRequest, i) => {
    router[method](values.urls[i], arraysInsideBodyRequest);
  });
});

export default router;
