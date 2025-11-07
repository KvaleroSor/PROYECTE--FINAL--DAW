import User from './../../models/users.js';

const deleteUser = async (id) => {
    try{    
        const resultDelete = await User.findByIdAndDelete(id);
        console.log("✅ EXITO - USUARIO ELIMINADO CORRECTAMENTE");
        return resultDelete;
    }catch(err){
        console.log("❌ ERROR - NO SE HA PODIDO ELIMINAR EL USUARIO | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteUser;