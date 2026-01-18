import { Router } from 'express';
import postSpend from './../../functions/functions_spends/postSpend.js';
import auth from './../../middleware/auth.js';

const router = Router();

router.post("/", auth, async (req, res) => {
    try {
        console.log("👤 req.user:", req.user);
        const user_id = req.user?.userId;
        console.log("🆔 user_id extracted:", user_id);
        
        if (!user_id) {
            console.log("❌ ERROR - USER_ID IS UNDEFINED");
            return res.status(401).json({
                mensaje: "❌ ERROR - USER NOT AUTHENTICATED",
            });
        }
        
        const reqSpend = { ...req.body, user_id };
        const { category_id, description, amount, date } = req.body;

        if(!user_id || !category_id || !description || !amount || !date ){
            console.log("❌ ERROR - SOME ELEMENT OF THE NEW SPEND IS EMPTY | SERVER");
            return res.status(204).send();
        }

        const resultNewSpend = await postSpend(reqSpend);

        return res.status(201).json({
            mensaje: "✅ - THE SPEND HAS BEEN CREATED",
            data_recived: reqSpend,
            new_spend: resultNewSpend,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVIDOR`,

            error: err.message,
        });
    }
});

export default router;