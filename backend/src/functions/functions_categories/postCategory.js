import Category from "../../models/categories.js";

const postCategory = async (newCategory) => {
    try {
        const { name, color = "Blue", icon = "Point blue" } = newCategory;

        const registreCategory = await Category.create({
            name: name,
            color: color,
            icon: icon,
        });

        return registreCategory;
    } catch (err) {
        console.error(err);
        console.log("❌ ERROR - THE CATEGORY HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postCategory;