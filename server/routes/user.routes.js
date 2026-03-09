import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middlewares.js'
import { getMyProfile } from '../controllers/user.controller.js'

export const router = Router()

router.route("/me").get(verifyJWT,getMyProfile)