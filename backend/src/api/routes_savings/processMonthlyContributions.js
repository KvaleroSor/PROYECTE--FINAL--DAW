import { Router } from "express";
import processMonthlyContributions from "../../functions/functions_savings/processMonthlyContributions.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.post("/process-monthly", auth, async (req, res) => {
    try {
        const user_id = req.user?.userId;
        const { savingFromNomina } = req.body;

        if (!savingFromNomina) {
            return res.status(400).json({
                mensaje: "❌ ERROR - MISSING savingFromNomina | SERVER"
            });
        }

        const result = await processMonthlyContributions(user_id, savingFromNomina);

        res.status(200).json({
            mensaje: "✅ - MONTHLY CONTRIBUTIONS PROCESSED",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message,
        });
    }
});

export default router;
