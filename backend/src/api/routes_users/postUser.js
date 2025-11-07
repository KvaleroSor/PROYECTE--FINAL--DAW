import { Router } from "express";
import postUser from "../../functions/functions_users/postUser.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const reqUser = req.body;
        const { name, email, password_hash } = reqUser; 

        if(!name || !email || !password_hash){
            res.status(204).send();
        }

        const resultNewUser = await postUser(reqUser);

        res.status(201).json({
            mensaje: "✅ - THE USER HAS BEEN CREATED",
            data_recived: reqUser,
            new_user: resultNewUser,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVIDOR`,
            error: err.mensage,
        });
    }
});

export default router;
