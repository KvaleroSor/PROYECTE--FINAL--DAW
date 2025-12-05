import { Router } from "express";
import getCategory from "../../functions/functions_categories/getCategory.js";

const router = Router();

router.get("/user/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const resultGet = await getCategory(user_id);

        !resultGet || resultGet.length === 0
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
            error: err.message,
        });
    }
});

export default router;