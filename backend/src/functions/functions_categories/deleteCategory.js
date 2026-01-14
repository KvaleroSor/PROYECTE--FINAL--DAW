import Category from "../../models/categories.js";
import Spend from "../../models/spends.js";

const deleteCategory = async (id, user_id) => {
    try {        
        await Spend.deleteMany({ category_id: id, user_id: user_id });
        
        const resultDelete = await Category.findOneAndDelete({
            _id: id, 
            user_id: user_id
        });
        
        return resultDelete;
    } catch(err) {
        console.log("❌ ERROR - THE CATEGORY HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteCategory;