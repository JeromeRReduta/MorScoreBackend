import express from "express";
import requireUser from "../middleware/requireUser.js";
import getUserFromToken from "../middleware/auth/getUserFromToken.js";
import requireBody from "../middleware/requireBody.js";

async function saveTextFile(req, res) {
  /**
   * use req.passageRepo to add passage to db - save ref
   * score passage
   * use req.opResultsRepo to add result to db - save ref
   * use req.opResultsPassageRepo to link passage id and result id
   * return morScoreResult.toJson()
   */
}

const router = express.Router();

router
  .route("/")
  .post(
    getUserFromToken,
    requireUser,
    requireBody("text", "algorithm", "is_public"),
    saveTextFile
  );

export default router;
