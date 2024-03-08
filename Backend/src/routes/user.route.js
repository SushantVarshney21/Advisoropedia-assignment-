import { Router } from "express";
import {  getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const  router = Router()

router.route("/register").post( registerUser)

  router.route("/login").post(loginUser)

  //secure routes

  router.route("/logout").post(verifyJwt, logoutUser)
  router.route("/current-user").get(verifyJwt, getCurrentUser)




export default router