import Category from "../../models/categories.js";

const getCategory = async () => {
    try {
        const resultGet = await Category.find({});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE CATEGORY COULD NOT BE FOUND | BBDD");
    }
};

export default getCategory;