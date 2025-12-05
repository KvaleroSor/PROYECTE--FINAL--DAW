import mongoose from "mongoose";

const nomina = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        required: false
    },
    payment_start_date: {
        type: Date,
        required: false,
        default: new Date(),
    }
});

const Nomina = mongoose.model("Nomina", nomina);
export default Nomina;
