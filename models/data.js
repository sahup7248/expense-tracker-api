const mongoose = require("mongoose"),

const DataSchema = new mongoose.Schema({
    type: String,
    category: {type: String, required:true},
    amount: {type: Number, required:true},
    date: {type: Date, required: true},
    user_id: {type: String,required: true},
});

module.exports = mongoose.model("Data", DataSchema);