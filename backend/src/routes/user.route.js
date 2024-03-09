import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import { verifyjwt } from "../middleswares/auth.middlesware.js"

const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

//secure

router.route("/logout").post(userLogout)



export default router