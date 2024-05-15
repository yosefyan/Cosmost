import express from "express";
import { mainApiRoutes, mainAuthRoutes } from "../constants/mainRoutes.js";
import errorCreater from "../helpers/errorCreater.js";
import {
  postsRegex,
  postsUsersRegex,
  usersRegex,
} from "../helpers/regexTypes.js";

const router = express.Router();
const { urls, files } = mainApiRoutes;
const { urls: authUrls, files: authFiles } = mainAuthRoutes;

urls.forEach((url, i) => router.use(url, files[i]));
authUrls.forEach((url, i) => router.use(url, authFiles[i]));

router.use((req, res) => {
  const match = req.path.split("/")[1].match(postsUsersRegex);
  let neededRoute = "";

  if (match) {
    const checkRegexGetAnswer = (regex, suggestedRoute) => {
      if (match.some((keyword) => keyword.match(regex))) {
        neededRoute = suggestedRoute;
      }
    };
    checkRegexGetAnswer(postsRegex, "posts");
    checkRegexGetAnswer(usersRegex, "users");
  }
  errorCreater(
    res,
    404,
    `Route "/api${req.path}" was not found, ${
      match
        ? `did you mean "/api/${neededRoute}/${req.path
            .split("/")
            .splice(2)
            .join("/")}"?`
        : "please verify your route and try again."
    }`
  );
});

export default router;
