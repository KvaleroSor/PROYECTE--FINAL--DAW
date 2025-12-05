import Nomina from './../../models/nomina.js';

const deleteNomina = async (id) => {
    try{    
        const resultDelete = await Nomina.findByIdAndDelete(id);
        
        return resultDelete;
    }catch(err){
        console.log("❌ ERROR - THE NOMINA HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteNomina;