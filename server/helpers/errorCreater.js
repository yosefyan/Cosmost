import Chalk from "chalk";
import debug from "debug";
import fs from "fs";
import path from "path";
import * as url from "url";
import { readFile, writeFile } from "./fileLoger.js";

const log = debug("app:server");

const errorCreater = (res, status, message) => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const logDirectory = path.join(__dirname, "../log");
  fs.stat(logDirectory, (err, stats) => {
    if (!stats) {
      fs.mkdir(logDirectory, (err) => {
       
        if (err) throw err;
        else writeFile(res, message, "");
      });
    }
    if (stats) {
      readFile((prevData) => {
        if (!prevData) writeFile(res, message, "");
        else writeFile(res, message, prevData);
      });
    }
  });
  log(Chalk.redBright(message));
  res.status(status).send(message);
};

export default errorCreater;
