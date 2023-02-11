import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rushimisha95:KLhrd4mUFR09VhNY@cluster0.8bbroey.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
