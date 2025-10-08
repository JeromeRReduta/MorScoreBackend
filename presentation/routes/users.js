import express from "express";
const router = express.Router();
router.route("/account").get();
router.route("/login").post();
router.route("/register").post();

export default router;
