import { rateLimit } from "express-rate-limit";

const limitUser = rateLimit({
  windowMs: 60 * 60 * 24,
  max: 3,
  message: "Too many attempts, please try again later.",
});

export default limitUser;
