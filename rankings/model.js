import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("rankings", schema);

export default model;