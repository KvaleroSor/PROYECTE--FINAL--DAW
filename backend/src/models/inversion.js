import mongoose from "mongoose";

const inversion = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    symbol: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    inversion_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    initial_price: {
        type: Number,
        required: false,
    },
    target_profitability: {
        type: Number,
        required: false,
    },
    real_profitability: {
        type: Number,
        required: false,
    },
    total: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        enum: ["active", "closed"],
        default: "active",
        required: true,
    },
    closing_date: {
        type: Date,
        required: false,
    },
    closing_price: {
        type: Number,
        required: false,
    },
    final_profit_loss: {
        type: Number,
        required: false,
    },
    final_value: {
        type: Number,
        required: false,
    },
});

const Inversion = mongoose.model("Inversion", inversion);
export default Inversion;
