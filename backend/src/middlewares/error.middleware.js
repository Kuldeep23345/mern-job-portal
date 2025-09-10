// backend/src/middlewares/error.middleware.js
import { ApiError } from "../utils/ApiError.js";

/**
 * 404 handler - convert not found URL to ApiError
 */
export const notFound = (req, res, next) => {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

/**
 * Global error handler - always respond with JSON
 */
export const errorHandler = (err, req, res, next) => {
  // If it's already an ApiError, keep its data
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }

  // Handle Mongoose validation errors (optional but useful)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  // Fallback for any other error
  console.error(err); // server-side log for debugging
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    // include stack only in development
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
