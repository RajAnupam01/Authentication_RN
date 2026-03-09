import express from "express"

const app = express();

app.use(express.json())

import {router as authRouter} from "./routes/auth.routes.js"
import {router as userRouter} from "./routes/user.routes.js"

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

export default app;

