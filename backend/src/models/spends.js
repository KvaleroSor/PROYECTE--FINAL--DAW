import mongoose from "mongoose";

const spendSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Categories",
        },
    ],
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        defualt: Date.now,
    },
    payment_type: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Spend = mongoose.model("Spend", spendSchema);
export default Spend;
