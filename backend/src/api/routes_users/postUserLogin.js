import { Router } from "express";
import postUserLogin from "./../../functions/functions_users/postUserLogin.js";
import verifyPassword from "../../utils/verifyPassword.js";
import jwt from "jasonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await postUserLogin(email);

        //Validem el usuari que tinguem nosaltres guardat en la BBDD, que ens haja tornat algo.
        if (!user) {
            return res.status(401).json({
                mensaje: "ERROR - THE EMAIL HAS NOT BEEN FIND | SERVER",
            });
        }

        //Validem el password una vegada hem encontrat l´usuari
        const isValid = await verifyPassword(user.password_hash, password);
        console.log(isValid);

        //Creamos el token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" } 
        );

        if (!isValid) {
            return res.status(401).json({
                mensaje: "ERROR - INCORRECT PASSWORD",
            });
        }

        const userObj = {
            user,
            token,
        };

        res.json(userObj);
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.mensage,
        });
    }
});

export default router;
