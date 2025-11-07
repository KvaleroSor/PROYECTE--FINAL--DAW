import User from "./../../models/users.js";

/**
 * @description Actualment estem passant el id però ens agradaria
 * passar el token que es genere una vegada sinicie sessió correctament.
 *
 *                  <- ANOTAT EN EL FULL DE RUTA ->
 * @anotation 🧑🏽‍💻 La idea es poder cambiar la password si el usuari o requerix,
 * però a hores d´ara encara no està implementat.
 *
 * @param {*} id
 */

const updateUser = async (id, data) => {
    try {
        const ressultUpdate = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return ressultUpdate;
    } catch (err) {
        console.log("❌ ERROR - THE USER HAS NOT BEEN UPDATED | BBDD");
        console.error(err);
        throw err;
    }
};

export default updateUser;
