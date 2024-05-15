import express from "express";
import { roomsRouteData } from "../../constants/routeData.js";
const router = express.Router();

Object.entries(roomsRouteData).map(([key, value]) => {
  return value.urls.map((val, i) => {
    return router[key](val, value.bodyRequest[i]);
  });
});

export default router;
