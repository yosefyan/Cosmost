import Joi from "joi";
import { emailPassword } from "../validationShards.js";

const loginValidation = async (data) => {
  try {
    const emailPasswordResult = await emailPassword(true, false);
    const Schema = Joi.object({
      ...emailPasswordResult,
    });
    return await Schema.validateAsync(data);
  } catch (error) {
    throw new Error(error);
  }
};

export default loginValidation;
