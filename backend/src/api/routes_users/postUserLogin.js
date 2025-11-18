import { Router } from "express";
import postUserLogin from "./../../functions/functions_users/postUserLogin.js";
import verifyPassword from "../../utils/verifyPassword.js";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await postUserLogin(email);
        console.log(user);
        console.log(user.email);
        console.log(user.password_hash);

        //Validem el usuari que tinguem nosaltres guardat en la BBDD, que ens haja tornat algo.
        if (!user) {
            return res.status(401).json({
                mensaje: "ERROR - THE EMAIL HAS NOT BEEN FIND | SERVER",
            });
        }

        const isValid = await verifyPassword(user.password_hash, password);
        console.log(isValid);
        //Validem la password que ens ha entrat desde el form i la que tinguem en la BBDD
        //que fa referencia a eixe email
        if (!isValid) {
            return res.status(401).json({
                mensaje: "ERROR - INCORRECT PASSWORD",
            });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.mensage,
        });
    }
});

export default router;
