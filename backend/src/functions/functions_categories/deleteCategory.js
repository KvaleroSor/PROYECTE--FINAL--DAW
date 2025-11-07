import Category from "../../models/categories.js";

const deleteCategory = async (id) => {
    try{    
        const resultDelete = await Category.findByIdAndDelete(id);
        
        return resultDelete;
    }catch(err){
        console.log("❌ ERROR - THE CATEGORY HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteCategory;