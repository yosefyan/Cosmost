import { generateHash } from "../helpers/bcryptServices.js";
import errorCreater from "../helpers/errorCreater.js";
import User from "../models/MongoDB/Collections/Schemas/Users.js";
import {
  createInstance,
  getInstance,
} from "../models/MongoDB/Collections/dynamicService.js";

const registerUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const findUser = await getInstance({
      collectionType: User,
      identifier: "Email",
      value: Email,
    });
    if (findUser.length > 0) throw new Error("User already exists.");
    const protectedPassword = await generateHash(Password);
    let newUser = await createInstance({
      collectionType: User,
      data: {
        ...req.body,
        Password: protectedPassword,
        Repeat_Password: protectedPassword,
        isAdmin: false
      },
    });
    newUser = newUser.toObject();
    delete newUser.Password;
    return res.json(newUser);
  } catch (error) {
    errorCreater(res, 400, error.message);
  }
};

export default registerUser;
