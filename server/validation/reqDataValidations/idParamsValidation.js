import Joi from "joi";

const idParamsValidation = async (id, username) => {
  try {
    const idValidation = !username
      ? Joi.string().hex().length(24).required()
      : Joi.string();
    return await idValidation.validateAsync(username || id);
  } catch (error) {
    throw new Error(error);
  }
};

export default idParamsValidation;
