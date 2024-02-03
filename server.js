import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import routes from "./app/routes/index.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://blog-app-frontend-isbb.vercel.app",
  ],
  default: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

import db from "./app/models/index.js";

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use("/", routes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
