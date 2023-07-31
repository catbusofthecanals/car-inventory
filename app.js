const express = require("express");
const app = express();
// const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// install middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const route = require("./controllers/car.controller");
// handle front end requests
app.use("/api", route);

// connect to mongodb url
const dbConnect = require("./db/dbConnect");

// excecute database connection
dbConnect();

// server listening on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
