import Joi from "joi";
import { passwordRegex } from "../helpers/regexTypes.js";
import { inlineValidation, nestedValidation } from "./genericValidation.js";

const validationShards = async () => ({
  image: nestedValidation({
    keys: { Profile_Picture: "Profile_Picture", Alt: "alt" },
  }).required(),
});

const passwordValidation = () =>
  inlineValidation({
    min: 7,
    max: 20,
    regex: passwordRegex,
    messages:
      "Password must contain at least one uppercase, lowercase, special character(!@#$%^&*-), and number",
  });

const emailPassword = async (
  shouldPassword = true,
  shouldRepeat = true,
  shouldEmail = true
) => ({
  ...(shouldEmail && {
    Email: inlineValidation({
      additionalType: Joi.string().email(),
      min: 5,
      max: 500,
      messages: "Please provide a valid email.",
    }),
  }),
  ...(shouldPassword && {
    Password: passwordValidation(),
  }),
  ...(shouldRepeat && {
    Repeat_Password: passwordValidation(),
  }),
});

export { validationShards, emailPassword };
