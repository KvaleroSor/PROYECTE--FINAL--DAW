import Category from "../../models/categories.js";

const deleteCategory = async (id, user_id) => {
    try{    
        const resultDelete = await Category.findByIdAndDelete({_id: id, user_id: user_id});
        
        return resultDelete;
    }catch(err){
        console.log("❌ ERROR - THE CATEGORY HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteCategory;