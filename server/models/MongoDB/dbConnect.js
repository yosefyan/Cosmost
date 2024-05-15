import mongoose from "mongoose";
import chalk from "chalk";
import { currentDB } from "../../constants/currentAdapter.js";
import debug from "debug";
import envAdapter from "../../helpers/envAdapter.js";

envAdapter();

const log = debug("app:Connections");

const connectToMongo = async () => {
  try {
    await mongoose.connect(`${process.env.DB_CONNECT}Cosmost`);
    log(chalk.yellow.bold(`DB - Connected | ${currentDB}`));
  } catch (err) {
    log(chalk.redBright.bold(`Error connecting to ${currentDB}: `, err));
  }
};

export { connectToMongo };
