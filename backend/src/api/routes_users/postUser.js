import { Router } from "express";
import postUser from "../../functions/functions_users/postUser.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const reqUser = req.body;

        console.log(reqUser);

        const resultNewUser = await postUser(reqUser);

        res.status(201).json({
            mensaje: "✅ - USUARIO CREADO CON EXITO",
            data_recived: reqUser,
            new_user: resultNewUser,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - NO SE HA CREADO EL USUARIO`,
            error: err.mensage,
        });
    }
});

export default router;
