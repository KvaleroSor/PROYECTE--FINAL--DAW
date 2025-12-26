import { Router } from 'express';
import postSpend from './../../functions/functions_spends/postSpend.js';

const router = Router();

router.post("/", async (req, res) => {
    try {
        const reqSpend = req.body;
        const { user_id, category_id, description, amount, date } = reqSpend;

        if(!user_id || categories.length === 0 || !description || !amount || !date ){
            console.log("❌ ERROR - SOME ELEMENT OF THE NEW SPEND IS EMPTY | SERVER");
            res.status(204).send();
        }

        const resultNewSpend = await postSpend(reqSpend);

        res.status(201).json({
            mensaje: "✅ - THE SPEND HAS BEEN CREATED",
            data_recived: reqSpend,
            new_spend: resultNewSpend,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVIDOR`,

            error: err.mensage,
        });
    }
});

export default router;