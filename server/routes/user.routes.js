import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middlewares.js'
import { getMyProfile, updateMyProfile } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

export const router = Router()

router.route("/me").get(verifyJWT,getMyProfile)
router.route("/update-me").patch(verifyJWT,upload.single('avatar'),updateMyProfile)