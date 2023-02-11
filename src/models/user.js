import mongoose, { mongo } from "mongoose";

const QuerySchema = mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
});

const model = mongoose.model("User", QuerySchema);
export const schema = model.schema;
export default model;
