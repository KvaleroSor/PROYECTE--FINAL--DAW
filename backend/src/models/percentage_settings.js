import mongoose from "mongoose";

const percentageSpend = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    spend: {
        type: Number,
        required: true,
    },
    leisureSpend: {
        type: Number,
        required: true,
    },
    saving: {
        type: Number,
        required: true,
    },
    inversion: {
        type: Number,
        required: true,
    },
});

const PercentageSpend = mongoose.model("PercentageSpend", percentageSpend);
export default PercentageSpend;
