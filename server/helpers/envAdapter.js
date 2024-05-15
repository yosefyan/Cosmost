import dotenv from "dotenv";

const envAdapter = () => {
  dotenv.config({
    path: `.env.${
      process.env.NODE_ENV === "production" ? "production" : "development"
    }`,
  });
};

export default envAdapter;
