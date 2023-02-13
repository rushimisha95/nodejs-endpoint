import express from "express";
import validate from "../../middleware/validationMiddleWare.js"; // ../.. middleware/validationMiddleWare.js
import { blog_schema, comment_schema } from "../../config/validation.js"; // ../..config/validation.js

import {
  getAllBlogs,
  createNewBlog,
  updateBlog,
  findBlog,
  deleteBlog,
  likeBlog,
} from "../../controllers/blogsController.js"; //../../controllers/blogsController.js
import { commentToBlog } from "../../controllers/commentcontroller.js"; // ../../controllers/commentsController.js
import multer from "multer";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js"; // middleware/authVerifyMiddleWare.js

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAllBlogs)
  .post([upload.single("image")], [validate(blog_schema)], createNewBlog); //upload.single("image")

router.route("/:id/comments").post([validate(comment_schema)], commentToBlog); //verifyUserToken

router.route("/:id/likes").post(likeBlog); //verifyUserToken

router
  .route("/:id")
  .put(
    [validate(blog_schema)], //verifyUserToken, upload.single("image"),
    updateBlog
  )
  .get(findBlog)
  .delete(deleteBlog); //verifyUserToken,

export default router;
