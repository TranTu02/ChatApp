const { default: mongoose, mongo } = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connect to DB");
    });

    connection.config("error", (error) => {
      console.log("Something is wrong in monngodb ", error);
    });
  } catch (error) {
    console.log("Some thing is wrong ", error);
  }
}
module.exports = connectDB;
