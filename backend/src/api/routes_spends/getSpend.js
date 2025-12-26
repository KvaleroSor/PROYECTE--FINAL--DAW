import { Router } from "express";
import getSpend from './../../functions/functions_spends/getSpend.js';

const router = Router();

router.get("/user/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const resultGet = await getSpend(user_id);

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SPENDS HAVE NOT BEEN FOUNDED | SERVER",
              })
            : res.status(201).json({
                  mensaje: "✅ - THE SPENDS HAVE BEEN FOUNDED",
                  data: resultGet
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message,
        });
    }
});

export default router;
