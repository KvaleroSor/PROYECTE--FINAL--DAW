import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
    },
    icon: {
        type: String,
        required: false,
    },
});

const Category = mongoose.model("Category", categoriesSchema);
export default Category;
