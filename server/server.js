const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./src/router/routes");
const { connectDb } = require("./src/connection/connection");

require("dotenv").config();

const app = express();
const port = 8000;

connectDb();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.listen(port, () => console.log(`server is running on port ${port}`));
