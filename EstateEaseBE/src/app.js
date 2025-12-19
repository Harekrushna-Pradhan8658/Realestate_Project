const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const postRouter = require("./routes/post.js");
const likedRouter = require("./routes/liked.js");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", postRouter);
app.use("/", likedRouter);

connectDB()
  .then(() => {
    console.log("Database connection established....!");
    app.listen(7777, () => {
      console.log("Server is successfully running on port number 7777....!");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected....!");
  });
