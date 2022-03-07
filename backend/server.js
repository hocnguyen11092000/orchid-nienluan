const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

dotenv.config({ path: "config/config.env" });

//Handing uncautch exception
process.on("uncaughtException", (err) => {
  console.log(`error: ${err.message}`);
  console.log("shutting down the server");

  process.exit(1);
});

//connect database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log("server is running port: " + process.env.PORT);
});

// Unhanded Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`error: ${err.message}`);
  console.log("shutting down the server");

  server.close(() => {
    process.exit(1);
  });
});
