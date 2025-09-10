import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.static("public"))
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

// Error handling middleware (MUST be last)
app.use(notFound);
app.use(errorHandler);

export { app };
