import Category from "../../models/categories.js";

const updateCategory = async (id, data) => {
    try {
        const ressultUpdate = await Category.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return ressultUpdate;
    } catch (err) {
        console.log("❌ ERROR - THE CATEGORY HAS NOT BEEN UPDATED | BBDD");
        console.error(err);
        throw err;
    }
};

export default updateCategory;