const express = require("express");
const AuthRouter = express.Router();
const { SignUp, Login,Logout,googleSignIn } = require("../controller/auth.controller");

AuthRouter.post("/register", SignUp);
AuthRouter.post("/login", Login);
AuthRouter.get('/logout', Logout);
AuthRouter.post('/google-signin', googleSignIn);





module.exports = AuthRouter;
