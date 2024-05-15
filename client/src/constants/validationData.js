import { emailRegex, passwordRegex } from "./regexTypes";

export const emailPasswordSettings = {
  Email: { regex: emailRegex },
  Password: { min: 8, regex: passwordRegex },
};
