import path from "path";
import fs from "fs";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const logDirectory = path.join(__dirname, "../log");
const currentDate = new Date();
const isoDateString = currentDate
  .toISOString()
  .replace(/[:.]/g, "-")
  .split("T");
const filePath = path.join(logDirectory, `${isoDateString[0]}.txt`);

const writeFile = (res, message, prevData) => {
  fs.writeFile(
    filePath,
    `${prevData}
    -----------------------------------
    📅 REQUEST DATE: ${isoDateString[1]} 
    
    📡 REQUEST STATUS: ${res.statusCode}
    
    📩 REQUEST MESSAGE: ${message}`,
    (err) => {
      if (err) throw new Error("Error creating file");
    }
  );
};

const readFile = (callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err) callback(null);
    } else callback(data);
  });
};

export { writeFile, readFile };
