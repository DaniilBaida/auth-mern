import express from "express";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use("/api/auth", authRouter);

app.listen(PORT || 3000, async () => {
    await connectDB();
    console.log(`Listening on http://localhost:${PORT || 3000}`);
});
