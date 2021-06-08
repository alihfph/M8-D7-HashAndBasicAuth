import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
  name: String,
  surname: String,
  // articles: [{ type: Schema.Types.ObjectId, required: true, ref: "article" }],
});

export default model("Author", AuthorSchema);