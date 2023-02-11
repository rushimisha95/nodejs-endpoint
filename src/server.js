import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js"; //config/connectDB.js
import passport from "passport";
import * as config_file from "./config/passportConfig.js"; // config/passportConfig.js
import blog_routes from "./routers/api/blogsRoutes.js"; //routes/api/blog_routes.js
import query_routes from "./routers/api/queriesrouters.js"; // routes/api/queries_routes.js
import user_routes from "./routers/api/userRoutes.js"; // routes/api/user_routes.js

const app = express();
app.use(
  session({
    secret:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
//connect to db
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
config_file.passport_signup(passport);
config_file.passport_login(passport);

app.use("/api/v1/users", user_routes);
app.use("/api/v1/blogs", blog_routes);
app.use("/api/v1/queries", query_routes);

mongoose.connection.once("open", () => {
  console.log("-->Connected to mongoDB");
  app.listen(4000, () => {
    console.log("(:). server is up and running!");
  });
});
export default app;
