
const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

const { HTTP_STATUS, ERROR_MESSAGES } = require("./utils/errors");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.error("DB connection error:", e));

const routes = require("./routes");

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: "699d1d36138d9fd2b4269dff" };
  next();
});

app.use(routes);

app.use((req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("This is working");
});
