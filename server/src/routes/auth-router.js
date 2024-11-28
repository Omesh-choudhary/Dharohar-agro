import express from "express"
import { register ,login, UserData, verificationCode } from "../controllers/auth-controller.js"
import validate from "../../middlewares/auth-middleware.js"
import signUpSchema from "../../validators/auth-validator.js"
import tokenMiddleware from "../../middlewares/token-middleware.js"
const authRouter = express.Router()

authRouter.route("/register").post( validate(signUpSchema)  ,register)
authRouter.route("/login").post(login)
authRouter.route("/user").get(tokenMiddleware,UserData)
authRouter.route("/verification").post(verificationCode)







export default authRouter