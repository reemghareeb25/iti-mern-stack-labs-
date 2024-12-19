const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("./routes/user");

const url = "mongodb://localhost:27017/todoDB";

app.use(express.json());

app.use(express.urlencoded({extended: true}));

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});