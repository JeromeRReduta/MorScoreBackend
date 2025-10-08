import express from "express";
import requireUser from "../middleware/requireUser.js";
import getUserFromToken from "../middleware/auth/getUserFromToken.js";
import requireBody from "../middleware/requireBody.js";
import scoreTextFile from "../middleware/scoreTextFile.js";
import Passage from "../../domain/passages/Passage.js";

async function uploadTextFile(req, res) {
  const { title, is_public: isPublic } = req.body;
  console.log("title here is", title);
  const passage = new Passage({
    docId: -1,
    title,
    content: req.text,
    isPublic,
  });
  const opMorScoreResult = req.result;
  const uploaded = await req.uploadTextUseCase.runAsync({
    passage,
    opMorScoreResult,
  });
  const json = JSON.stringify(uploaded);
  console.log("uploaded is", uploaded);
  console.log("as json", json);
  res.status(201).send(json);
  /**
   * use req.passageRepo to add passage to db - save ref
   * score passage
   * use req.opResultsRepo to add result to db - save ref
   * use req.opResultsPassageRepo to link passage id and result id
   * return morScoreResult.toJson()
   */
}

const router = express.Router();

router.route("/").post(
  getUserFromToken,
  requireUser,

  requireBody("text", "algorithm", "is_public", "title"),
  (req, res, next) => {
    console.log("still good here");
    next();
  },

  scoreTextFile,
  uploadTextFile
);

export default router;
