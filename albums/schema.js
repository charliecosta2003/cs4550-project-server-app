import mongoose from "mongoose";

const schema = new mongoose.Schema({
        _id: {type: String, required: true},
        name: {type: String, required: true},
        image: String
    },
    {collection: "albums"}
);

export default schema;