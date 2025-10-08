import express from "express";
import cors from "cors";
import getYourMorScoreRouter from "./presentation/routes/getYourMorScore.js";
import userRouter from "./presentation/routes/users.js";
import saveYourTextRouter from "./presentation/routes/saveYourTexts.js";
import PgUserRepo from "./infrastructure/accounts/PgUserRepo.js";
import db from "./infrastructure/psql/client.js";
import RegisterUseCase from "./application/RegisterUseCase.js";
import LoginUseCase from "./application/LoginUseCase.js";
import CheckPwUseCase from "./application/CheckPwUseCase.js";
import AuthWithIdUseCase from "./application/AuthWithIdUseCase.js";
import ScoreTextUseCase from "./application/ScoreTextUseCase.js";
import PorterBasedStemmer from "./infrastructure/token-preprocessing/stemming/PorterBasedStemmer.js";
import NtlkStopwordChecker from "./infrastructure/token-preprocessing/stopword-checking/NtlkStopwordChecker.js";
import SimplePreprocessor from "./infrastructure/token-preprocessing/SimplePreprocessor.js";
import SimplePostingsListFactory from "./domain/postings/SimplePostingsList.js";
import UploadTextUseCase from "./application/UploadTextUseCase.js";
import PgPassageRepo from "./infrastructure/passages/PgPassageRepo.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const passageRepo = new PgPassageRepo({ pgClient: db });
  req.uploadTextUseCase = new UploadTextUseCase(passageRepo);
  next();
});
app.use((req, res, next) => {
  const userRepo = new PgUserRepo({ pgClient: db });
  req.registerUseCase = new RegisterUseCase(userRepo);
  req.loginUseCase = new LoginUseCase(userRepo);
  req.checkPwUseCase = new CheckPwUseCase(userRepo);
  req.authWithIdUseCase = new AuthWithIdUseCase(userRepo);
  next();
});

app.route("/").get((req, res) => {
  res.status(200).send("Boop snoop lettuce me doop");
});

app.use("/get-your-morscore", getYourMorScoreRouter);
app.use("/users", userRouter);
app.use("/save-your-text", saveYourTextRouter);

/** Just gonna add these 2 error handlers from assignments */
app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .send(err.message ?? "Sorry! Something went wrong.");
});

export default app;
