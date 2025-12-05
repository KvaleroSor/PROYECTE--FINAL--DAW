import Inversion from './../../models/inversion.js';

const deleteInversion = async (id) => {
    try{    
        const resultDelete = await Inversion.findByIdAndDelete(id);
        
        return resultDelete;
    }catch(err){
        console.log("❌ ERROR - THE INVERSION HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteInversion;