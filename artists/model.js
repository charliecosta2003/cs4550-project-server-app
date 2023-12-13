import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("artists", schema);

export default model;