import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    monthly_budget: {
        type: Number,
        required: true
    },
    category_type: {
        type: String,
        enum: ["Gasto Fijo", "Gasto Ocio", "Inversion", "Ahorro"],
        required: true,        
    },
    total_acumulated: {
        type: Number,
        required: false,
        default: 0,
    },
    color: {
        type: String,
        required: false,
    },
    icon: {
        type: String,
        required: false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Category = mongoose.model("Category", categoriesSchema);
export default Category;
