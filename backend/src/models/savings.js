import mongoose from "mongoose";

const savingGoal = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    goal_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    target_amount: {
        type: Number,
        required: true
    },
    current_amount: {
        type: Number,
        required: true,
        default: 0
    },
    percentage_allocation: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    deadline: {
        type: Date,
        required: false
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "medium"
    },
    status: {
        type: String,
        enum: ["active", "completed", "paused"],
        default: "active"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const SavingGoal = mongoose.model("SavingGoal", savingGoal);
export default SavingGoal;
