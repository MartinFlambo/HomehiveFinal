import express from 'express';
import "dotenv/config";
import cors from "cors";
import job from "./lib/cron";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import path from "path";

import { connectDB } from "./lib/db";

const app = express();
const PORT = process.env.PORT || 3000;


job.start();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/static", express.static(path.join(__dirname, "..", "public")));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});
