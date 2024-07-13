const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to DB");
    });

    connection.on("error", (error) => {
      console.error("Something is wrong in MongoDB", error);
    });
  } catch (error) {
    console.error("Something is wrong", error);
  }
}

module.exports = connectDB;
