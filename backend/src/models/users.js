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

    }
});

const User = mongoose.model("User", userSchema);
export default User;
