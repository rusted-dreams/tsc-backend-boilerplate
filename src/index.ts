import express from "express";
import dotenv from "dotenv";
import pool, { testDBConnection } from "./db/connectDB";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

//test db connection
testDBConnection();

app.get("/", (req, res) => {
  res.send("welcome to the todo app");
});

app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}`);
});
