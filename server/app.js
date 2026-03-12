import express from "express"

const app = express();

app.use(express.json())

import {router as authRouter} from "./routes/auth.routes.js"
import {router as userRouter} from "./routes/user.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.use(errorMiddleware)

export default app;

