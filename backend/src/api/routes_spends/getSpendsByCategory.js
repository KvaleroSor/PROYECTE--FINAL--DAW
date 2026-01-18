import { Router } from "express";
import getSpendsByCategory from "../../functions/functions_spends/getSpendsByCategory.js";
import auth from './../../middleware/auth.js';

const router = Router();

router.get("/category/:category_id", auth, async (req, res) => {
    try {
        const id = req.params.category_id;
        const resultGetId = await getSpendsByCategory(id);

        !resultGetId
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SPEND HAS NOT BEEN FOUND | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE SPEND HAS BEEN FOUND",
                  data: resultGetId,
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SEVER`,
            error: err.mensage,
        });
    }
});

export default router;
