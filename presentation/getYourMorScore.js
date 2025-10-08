import express from "express";
const router = express.Router();

router
  .route("/")

  .get((req, res) => {
    return res.status(200).send({ text: "TODO: Fix this I think?" });
  })

  .post((req, res) => {
    return res.status(200).send({ text: "o mai god hai hello" });
  });

export default router;
