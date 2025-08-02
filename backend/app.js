import express from "express";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
    res.send("AUTH");
});

app.listen(PORT || 3000, async () => {
    await connectDB();
    console.log(`Listening on http://localhost:${PORT || 3000}`);
});
