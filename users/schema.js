import mongoose from "mongoose";

const schema = new mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: String,
        phone: String,
        dob: Date,
        role: {type: String, enum: ["USER", "ADMIN"], default: "USER"}
    },
    {collection: "users"});

export default schema;