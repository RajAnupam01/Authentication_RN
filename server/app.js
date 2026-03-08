import express from "express"

const app = express();

app.use(express.json())

import {router as authRouter} from "./routes/auth.routes.js"
app.use("/api/auth",authRouter)

export default app;

