import { Router } from "express";
import getCategory from "../../functions/functions_categories/getCategory.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const resultGet = await getCategory();

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE CATEGORIES HAVE NOT BEEN FOUND | SERVER",
              })
            : res.status(201).json({
                  mensaje: "✅ - THE CATEGORIES HAVE BEEN FOUND",
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