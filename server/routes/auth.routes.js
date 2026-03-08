import {Router} from "express"
import { LoginController, LogoutController, RegenerateAccessTokenController, RegisterController } from "../controllers/auth.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

export const router = Router()

router.route("/register").post(upload.single("avatar"),RegisterController);
router.route("/login").post(LoginController);
router.route("/logout").post(verifyJWT,LogoutController)
router.route("/regenerate-access-token").get(RegenerateAccessTokenController)