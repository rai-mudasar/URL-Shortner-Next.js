import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Db Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("Error in Database Connectivity :", err);
      process.exit();
    });
  } catch (err) {
    console.log("Something went Wrong : ", err);
  }
};

export default connect;
