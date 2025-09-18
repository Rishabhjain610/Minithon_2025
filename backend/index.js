const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ConnectDB = require("./Db/Db");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/auth.routes");
const UserRouter = require("./routes/user.routes");
const ChatRouter = require("./routes/chatbot.routes");
ConnectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/chatbot", ChatRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
