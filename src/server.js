const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const sequelize = require("../config/database");
require("../models");
sequelize.sync({
  alter: true,
});

app.get("/api", (req, res) => {
  res.send({ message: "hello" });
});

app.post("/content", (req, res) => {
  const { type, status, content } = req.body;

  if (!type || !status || !content) {
    return res.status(400).json({ error: "모든 필수 입력 값을 입력해주세요!" });
  }

  console.log("Received POST request with data:", { type, status, content });
  return res
    .status(200)
    .json({ success: true, message: "Data received successfully!" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
