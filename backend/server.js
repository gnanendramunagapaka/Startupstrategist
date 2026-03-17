import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";

import ideaRoutes from "./routes/ideaRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/idea", ideaRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});