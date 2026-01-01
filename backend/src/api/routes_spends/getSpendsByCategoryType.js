import { Router } from "express";
import getSpendsByCategoryType from "../../functions/functions_spends/getSpendsByCategoryType.js";

const router = Router();

router.get("/type/:category_type", async (req, res) => {
    try {
        const category_type = req.params.category_type;
        const resultGetId = await getSpendsByCategoryType(category_type);

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