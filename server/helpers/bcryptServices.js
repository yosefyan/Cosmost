import bcrypt from "bcrypt";

const generateHash = (password) => bcrypt.hash(password, 10);

const compareHash = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export { generateHash, compareHash };
