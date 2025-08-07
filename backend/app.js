import express from "express";
import { FRONTEND_URL, PORT } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use(errorHandler);

await connectDB();

app.listen(PORT || 5000, () => {
    console.log(`Listening on http://localhost:${PORT || 5000}`);
});
