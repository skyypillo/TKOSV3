import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import users from "./routes/user.js";
import lessons from "./routes/lessons.js";
import sounds from "./routes/sounds.js";

import path from "path";
import { fileURLToPath } from "url";

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

// Use the client app
app.use(express.static(path.join(__dirname, "/client/dist")));

// Render client for any path
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
