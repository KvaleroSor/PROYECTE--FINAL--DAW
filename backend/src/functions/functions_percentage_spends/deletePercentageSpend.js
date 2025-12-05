import PercentageSpend from "./../../models/percentage_settings.js";

const deleteSpendPercentage = async (id) => {
    try{    
        const resultDelete = await PercentageSpend.findByIdAndDelete(id);
        
        return resultDelete;
    }catch(err){
        console.log("❌ ERROR - THE SPEND PERCENTAGE HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteSpendPercentage;