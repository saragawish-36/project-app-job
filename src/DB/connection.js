import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.CONCTION)
    .then((res) => console.log("DB connction"))
    .catch((error) => console.error("fail to connect on DB"));
};

export default connectDB;
