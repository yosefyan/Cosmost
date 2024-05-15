import { customAlphabet } from "nanoid";

let generatedNumbersArray = [];

const generateUniqueNumber = () => customAlphabet("0123456789", 7)();

const uniqueNumber = () => {
  let newNumber = generateUniqueNumber();
  while (generatedNumbersArray.includes(newNumber)) {
    newNumber = generateUniqueNumber();
  }
  generatedNumbersArray.push(newNumber);
  return newNumber;
};

export default uniqueNumber;
