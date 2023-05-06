const express = require("express");
require("dotenv").config();

const connectDb = require("./db/connect");
const notFound = require("./middleware/notFound");
const customErrorHandler = require("./middleware/errorHandler");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/task", require("./routes/taskRoutes"));
app.use("/api/v1/post", require("./routes/postRoutes"));
app.use("/api/v1/comment", require("./routes/commentRoutes"));

//default routes override
app.use(notFound);
app.use(customErrorHandler);

(async () => {
  try {
    await connectDb(process.env.MONGO_DB_URI);
    app.listen(
      port,
      console.log(`Server started at ${port}..., Press Ctrl+c to stop...`)
    );
  } catch (error) {
    console.log(error);
  }
})();
