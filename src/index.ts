import express from "express";
import userRoutes from "./routes/users.routes";

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if no env variable

app.use(express.json()); // Middleware for JSON support
app.use("/users", userRoutes); // Mount user routes

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
