import express from "express";
import requireBody from "../middleware/requireBody.js";
import requireUniquePassword from "../middleware/requireUniquePassword.js";
import requireUser from "../middleware/requireUser.js";
import serveToken from "../middleware/auth/serveToken.js";

/**
 * Preconditions:
 * req.loginUseCase exists
 * requireBody("email", "password") has passed
 */
async function login(req, res, next) {
  const { email, password } = req.body;
  req.user = await req.loginUseCase.runAsync({
    loginInfo: { email, password },
  });
  next();
}

/**
 * Preconditions:
 * req.registerUseCase exists
 * requireBody("email", "name", "password") has passed
 */
async function register(req, res, next) {
  const { email, name, password } = req.body;
  req.user = await req.registerUseCase.runAsync({ email, name, password });
  next();
}

const router = express.Router();
router.route("/account").get((req, res) => {
  res.status(200).send({ text: "ok" });
});

router
  .route("/login")
  .post(
    requireBody("email", "password"),
    login,
    requireUser,
    serveToken({ isNewAccount: false })
  );

router
  .route("/register")
  .post(
    requireBody("email", "name", "password"),
    requireUniquePassword,
    register,
    requireUser,
    serveToken({ isNewAccount: true })
  );

export default router;
