import express from "express";
import {
  getAllQueries,
  createNewQuery,
  deleteQuery,
} from "../../controllers/queryController.js"; //controllers/queryController.js
import validate from "../../middleware/validationMiddleWare.js"; // middleware/validationMiddleWare.js
import { query_schema } from "../../config/validation.js"; //config/validation.js
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js"; // middleware/authVerifyMiddleWare.js

const router = express.Router();

router
  .route("/")
  .get(getAllQueries) //verifyUserToken
  .post(validate(query_schema), createNewQuery);

router.route("/:id").delete(verifyUserToken, deleteQuery);
export default router;
