import jwt from "jsonwebtoken";
import { promisify } from "util";

const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

const generateToken = async (payload, expDate = "30d") => {
  try {
    const token = await signAsync(payload, process.env.P_TOKEN_KEY, {
      expiresIn: expDate,
    });
    return token;
  } catch (err) {
    throw new Error("Couldn't generate token");
  }
};

const verifyToken = async (token) => {
  try {
    const payload = await verifyAsync(token, process.env.P_TOKEN_KEY);
    return payload;
  } catch (err) {
    throw new Error("Couldn't verify token");
  }
};

export { generateToken, verifyToken };
