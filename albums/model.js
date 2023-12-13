import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("albums", schema);

export default model;