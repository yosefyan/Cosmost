import { currentValidation } from "../constants/currentAdapter.js";
import idParamsValidation from "./reqDataValidations/idParamsValidation.js";
import postValidation from "./websiteAreas/postValidation.js";
import loginValidation from "./websiteAreas/loginValidation.js";
import userValidation from "./websiteAreas/userValidation.js";

const validationAdapter = async (method) => {
  try {
    if (currentValidation === "Joi") {
      return await method;
    } else {
      throw new Error(`Validation ${currentValidation} is not supported`);
    }
  } catch (error) {
    throw error;
  }
};

const userValidationAdapter = async (
  data,
  shouldPassword,
  shouldRepeat,
  shouldEmail,
  onlyUsername
) =>
  await validationAdapter(
    userValidation(
      data,
      shouldPassword,
      shouldRepeat,
      shouldEmail,
      onlyUsername
    )
  );

const objectIdValidationAdapter = async (id, username) =>
  await validationAdapter(idParamsValidation(id, username));

const loginValidationAdapter = async (data) =>
  await validationAdapter(loginValidation(data));

const postValidationAdapter = async (data, _, whatType) => {
  await validationAdapter(postValidation(data, whatType));
};

export {
  validationAdapter,
  userValidationAdapter,
  loginValidationAdapter,
  objectIdValidationAdapter,
  postValidationAdapter,
};
