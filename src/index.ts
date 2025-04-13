import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("welcome to the todo app");
});

app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}`);
});
