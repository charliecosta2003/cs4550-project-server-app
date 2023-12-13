import mongoose from "mongoose";

const schema = new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
        artist: {type: String, ref: "artists", required: true},
    },
    {collection: "favorites"}
);

export default schema;