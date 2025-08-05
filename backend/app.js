import express from "express";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use(errorHandler);

await connectDB();

app.listen(PORT || 3000, () => {
    console.log(`Listening on http://localhost:${PORT || 3000}`);
});
