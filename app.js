import express from "express";
import cors from "cors";
import getYourMorScoreRouter from "./presentation/routes/getYourMorScore.js";

const app = express();
app.use(cors());
app.use(express.json());

app.route("/").get((req, res) => {
  res.status(200).send("Boop snoop lettuce me doop");
});

app.use("/get-your-morscore", getYourMorScoreRouter);

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
