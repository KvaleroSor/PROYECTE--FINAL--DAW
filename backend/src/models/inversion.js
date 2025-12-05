import mongoose from "mongoose";

const inversion = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    inversion_date: {
        type: Date,
        required: true,
        default: new Date()
    },
    target_profitability:{
        type: Number,
        required: false
    },
    real_profitability: {
        type: Number,
        required: false
    },
    total: {
        type: Number,
        required: false
    }
});

const Inversion = mongoose.model("Inversion", inversion);
export default Inversion;
