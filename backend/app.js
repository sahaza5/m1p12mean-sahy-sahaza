const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./dbConnect/dbConnect");
const app = express();
const userRoutes = require("./routes/users.route");
const apointmentRoute = require("./routes/apointments.route");
const vehiculeRoute = require("./routes/car.route");
const taskRoute = require("./routes/task.route");

app.use(express.json());
app.use(cors());
app.use("/vehicle/", express.static("images"));

//PORT FROM .env FILE
const serverPort = process.env.SERVER_PORT || 5000;
const mongodbPort = process.env.MONGODB_PORT;

app.use("/api/users/", userRoutes);
app.use("/api/apointments", apointmentRoute);
app.use("/api/vehicule", vehiculeRoute);
app.use("/api/tasks", taskRoute);

//STARTING THE SERVER
const start = async () => {
  console.log("Mondb is ", mongodbPort);
  try {
    if (!mongodbPort) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables"
      );
    }
    await connectDB(mongodbPort);
    app.listen(serverPort, () => {
      console.log(`App is listening on port ${serverPort}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
