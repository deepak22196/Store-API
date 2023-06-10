require("./database/connect");
const connectDB = require("./database/connect");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
require("dotenv").config();
const express = require("express");
const app = express();

const port = 6000;

const productRouter = require("./routes/productRouter");

app.use(express.json());

app.use("/api/v1/store", productRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`database connected successfully`);
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("error connecting to database", error);
  }
};

start();
