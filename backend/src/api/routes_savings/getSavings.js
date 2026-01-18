import { Router } from "express";
import getSavings from './../../functions/functions_savings/getSavings.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const user_id = req.user?.userId;
        const resultGet = await getSavings(user_id);

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SAVINGS HAVE NOT BEEN FOUND | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE SAVINGS HAVE BEEN FOUND",
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
