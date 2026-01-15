// const express = require("express");
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messsageRoutes from "./routes/message.routes.js";

const app = express();

dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messsageRoutes);

app.listen(3000, () => {
  console.log("Server is running :", process.env.PORT);
});
