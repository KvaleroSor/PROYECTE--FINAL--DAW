import User from "../../models/users.js";
import hashingPassword from "../../utils/hashingPassword.js";

/**
 * @description Quan l´usuari done a "crear usuari":
 *
 *  1- Comprobar que el correu no estiga ja guardat amb la BBDD per a que no hi hagen duplicitats.
 *  2- Si el correu no està duplicat:
 *      2.1 - Comprobar que no hi hagen camps "requerits" buits.
 *      2.2 - Assegurar-se que "hashegem" la password.
 *
 *
 * @param {*} newUser
 * @returns
 */

const postNewUser = async (newUser) => {
    try {
        const { name, email, password_hash, nomina, percentageSpend, role } =
            newUser;
        const password_hashed = await hashingPassword(password_hash);

        //Realitzar accions de "SEGURETAT" abans de crear el nou usuari.
        const userSearched = await User.findOne({ email });

        if (userSearched) {
            console.log("❌ ERROR - THE USER WITH THIS EMAIL EXIST | BBDD");
            throw new Error("El usuario con este email ya existe");
        }

        const registeredUser = await User.create({
            name: name,
            email: email,
            password_hash: password_hashed,
            nomina: nomina,
            percentageSpend: percentageSpend,
            role: role,
        });

        return registeredUser;
    } catch (err) {
        console.error(err);
        console.log("❌ ERROR - THE USER HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postNewUser;
