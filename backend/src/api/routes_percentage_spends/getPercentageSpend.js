import { Router } from "express";
import getSpendPercentage from "../../functions/functions_percentage_spends/getPercentageSpend.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.get("/", auth, async (req, res) => {
    try {
        // const user_id = req.params.user_id;
        const resultGet = await getSpendPercentage();

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SPEND PERCENTAGE HAVE NOT BEEN FOUNDED | SERVER",
              })
            : res.status(201).json({
                  mensaje: "✅ - THE SPEND PERCENTAGE HAVE BEEN FOUNDED",
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
