import { Router } from 'express';
import postInversion from './../../functions/functions_inversion/postInversion.js';
import auth from './../../middleware/auth.js';

const router = Router();

router.post("/", auth, async (req, res) => {
    try {
        const user_id = req.user?.userId;
        const reqInversion = { ...req.body, user_id };
        const { type, amount } = req.body;

        if(!user_id || !type || !amount){
            console.log("❌ ERROR - SOME ELEMENT OF THE NEW SPEND IS EMPTY | SERVER");
            res.status(204).send();
        }

        const resultNewInversion = await postInversion(reqInversion);

        res.status(201).json({
            mensaje: "✅ - THE INVERSION HAS BEEN CREATED",
            data_recived: reqInversion,
            new_spend: resultNewInversion,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVIDOR`,

            error: err.mensage,
        });
    }
});

export default router;