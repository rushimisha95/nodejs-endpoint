import mongoose, { mongo } from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  likes: {
    type: [{ email: String, date: Date }],
    default: [],
  },
});

const model = mongoose.model("Blog", blogSchema);

export const schema = model.schema;
export default model;
