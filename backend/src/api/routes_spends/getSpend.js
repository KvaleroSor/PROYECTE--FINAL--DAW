import { Router } from "express";
import getSpend from './../../functions/functions_spends/getSpend.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const resultGet = await getSpend();

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
            error: err.mensage,
        });
    }
});

export default router;
