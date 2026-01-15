// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import messsageRoutes from "./routes/message.routes.js";

const app = express();

const __dirname = path.resolve();

dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messsageRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(3000, () => {
  console.log("Server is running :", process.env.PORT);
});
