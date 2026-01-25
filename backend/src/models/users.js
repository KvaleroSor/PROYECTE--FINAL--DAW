import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "ERROR - EMAIL NO VALIDO"],
    },
    password_hash: {
        type: String,
        required: true,
        minlength: 8,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
    nomina: {
        type: Number,
        required: true,
    },
    percentageSpend: {
        namePercentageSpend: { 
            type: String,
            required: true,
            default: "Conservator"
        },
        fixedExpenses: {
            type: Number,
            required: true,
            default: 60,
        },
        leisureExpenses: {
            type: Number,
            required: true,
            default: 10,
        },
        investment: {
            type: Number,
            required: true,
            default: 10,
        },
        savings: {
            type: Number,
            required: true,
            default: 20,
        },
    },
    theme: {
        type: String,
        default: "light",
    },
    language: {
        type: String,
        default: "es",
    },
    role: {
        type: String,     
        enum: ["user", "admin"],   
        default: "user"
    },
    ahorroGeneral: {
        type: Number,
        default: 0,
    }
});

const User = mongoose.model("User", userSchema);
export default User;
