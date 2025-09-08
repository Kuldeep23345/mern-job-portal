import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import JobRoutes from "./routes/job.route.js"
import applicationRoutes from "./routes/application.route.js"
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", JobRoutes);
app.use("/api/v1/application", applicationRoutes);

export { app };
