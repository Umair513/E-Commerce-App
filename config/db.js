import mongoose from "mongoose";
import colors from "colors";
const coonnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DB`.bgGreen.white);
  } catch (error) {
    console.log(`Error in DB Connection : ${error.message}`.red);
  }
};

export default coonnectDB;
