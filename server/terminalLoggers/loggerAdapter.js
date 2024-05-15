import { currentLogger } from "../constants/currentAdapter.js";
import morgan from "./morganLogger.js";

const loggerAdapter = () => {
  if (currentLogger === "Morgan") return morgan;
  throw Error(`Current ${currentLogger} logger is not supported.`);
};

export default loggerAdapter;
