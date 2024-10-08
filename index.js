import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import users from "./routes/user.js";
import lessons from "./routes/lessons.js";
import sounds from "./routes/sounds.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Resolving dirname from ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: process.env.DOMAIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/user", users);
app.use("/lesson", lessons);
app.use("/sound", sounds);

// Determine the correct client path
const clientPath = path.join(__dirname, "client", "dist");
const indexPath = path.join(clientPath, "index.html");

// Check if the client directory exists
if (fs.existsSync(clientPath)) {
  console.log("Client directory found:", clientPath);

  // Serve static files
  app.use(express.static(clientPath));

  // Render client for any path
  app.get("*", (req, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("index.html not found");
    }
  });
} else {
  console.error("Client directory not found:", clientPath);
  app.use((req, res) => {
    res.status(404).send("Client files not found");
  });
}

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
