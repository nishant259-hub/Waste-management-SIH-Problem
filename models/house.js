const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    id: Number,
    house: String,
    status: {
        type: String,
        default: "Need cleaning"
    },
    floor: String,
    ward: String,
    coins: {
        type: Number, default: 0
    },
    username: { type: String },
    password: { type: String },
    dailyCode: { type: String, default: "123456" },

    batchId: { type: String },
    handShakeCode: { type: String }

});

module.exports = mongoose.model("house", houseSchema);