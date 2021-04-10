const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    type: {type: String, required:true},
    category: {type: String, required:true},
    amount: {type: Number, required:true},
    date: {type: String, required: true},
    user_id: {type: String,required: true},
});

module.exports = mongoose.model("Data", DataSchema);