import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import JobRoutes from "./routes/job.route.js"
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", JobRoutes);

export { app };
