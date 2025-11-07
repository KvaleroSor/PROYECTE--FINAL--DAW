import Spend from './../../models/spends.js';

const deleteSpend = async (id) => {
    try{    
        const resultDelete = await Spend.findByIdAndDelete(id);
        
        return resultDelete;
    }catch(err){
        console.log("❌ ERROR - THE SPEND HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteSpend;