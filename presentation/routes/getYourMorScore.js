import express from "express";
import requireBody from "../middleware/requireBody.js";
const router = express.Router();

router
  .route("/")

  .get((req, res) => {
    return res.status(200).send({ text: "TODO: Fix this I think?" });
  })

  .post(
    requireBody("algorithm", "text"),

    (req, res) => {
      const mock = {
        text: `Your algorithm is ${req.body.algorithm}. Your text begins with ${req.body.text[0]}`,
      };
      return res.status(200).send(mock);
    }
  );

export default router;
