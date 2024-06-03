import { defaultUser } from "../constants/alternativePhotos.js";
import { compareHash } from "../helpers/bcryptServices.js";
import errorCreater from "../helpers/errorCreater.js";
import { generateToken } from "../helpers/tokenServices.js";
import User from "../models/MongoDB/Collections/Schemas/Users.js";
import { getInstance } from "../models/MongoDB/Collections/dynamicService.js";

const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) throw new Error("Invalid email or password.");
    const userFromDB = await getInstance({
      collectionType: User,
      identifier: "Email",
      value: Email,
    });
    if (userFromDB.length === 0)
      throw new Error("Account not found. Please register.");
    const isPasswordMatching = await compareHash(
      Password,
      userFromDB[0].Password ||
        userFromDB.Password ||
        userFromDB[0].Repeat_Password
    );

    if (!isPasswordMatching) throw new Error("Invalid email or password.");

    const { _id, isAdmin, userData, moneyData, ownedStuff } = userFromDB[0];
    const { Alt, Rank, Username } = userData;
    const generatedToken = await generateToken({
      _id,
      isAdmin,
      Rank,
      Username,
      Profile_Picture: userData?.Profile_Picture || defaultUser,
      Alt: userData?.Alt || "Profile Picture",
      moneyData,
      ownedStuff,
    });

    return res.json(generatedToken);
  } catch (error) {
    errorCreater(res, 400, error.message);
  }
};

export default loginUser;
