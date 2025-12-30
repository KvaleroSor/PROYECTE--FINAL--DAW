import { Router } from "express";
import getCategoryByCategoryType from './../../functions/functions_categories/getCategoryByCategoryType.js';

const router = Router();

router.get("/category/:category_id", async (req, res) => {
    try {
        const category_type = req.body;
        const resultGetId = await getCategoryByCategoryType(category_type);

        !resultGetId
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE CATEGORIES HAS NOT BEEN FOUND | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE CATEGORIES HAS BEEN FOUND",
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
