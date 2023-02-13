import express from "express";
import { commentToBlog } from "../../controllers/commentcontroller.js";
const router = express.Router();

router.route("/").get(getAllBlogs);
