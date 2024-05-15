import express from "express";
import { usersRouteData } from "../../constants/routeData.js";
const router = express.Router();

Object.entries(usersRouteData).forEach(([method, values]) => {
  values.bodyRequest.forEach((arraysInsideBodyRequest, i) => {
    router[method](values.urls[i], arraysInsideBodyRequest);
  });
});

export default router;
