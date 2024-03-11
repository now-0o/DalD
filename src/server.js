const express = require("express");
const bodyParser = require("body-parser");
const { Item, Status, Type } = require("../models");
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

app.post("/content", async (req, res) => {
  const { content, statusId, typeId } = req.body;

  if (!content || !statusId || !typeId) {
    return res.status(400).json({ error: "모든 필수 입력 값을 입력해주세요!" });
  }

  const newItem = await sequelize.transaction(async () => {
    return await Item.create({
      content,
      statusId: parseInt(statusId),
      typeId: parseInt(typeId),
    });
  });

  return res.status(200).json({ success: true, message: newItem });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
