const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

// app.set("trust proxy", "http://localhost:3000");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const address = require("./routes/addressRoute");
const blog = require("./routes/blogRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", address);
app.use("/api/v1", blog);
app.get("/", (req, res) => {
  res.send("helloword");
});

// app.use(express.static(path.join(__dirname, "../orchid/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../orchid/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
