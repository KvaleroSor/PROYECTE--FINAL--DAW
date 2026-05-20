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
                mensaje: "❌ ERROR - MISSING savingFromNomina | SERVER",
            });
        }

        const result = await processMonthlyContributions(
            user_id,
            savingFromNomina,
        );

        // Verificar si se procesaron contribuciones
        if (result.processed === 0) {
            return res.status(200).json({
                mensaje: "⚠️ - Ya existen contribuciones para este mes",
                data: result,
                alreadyProcessed: true,
            });
        }

        res.status(200).json({
            mensaje: "✅ - MONTHLY CONTRIBUTIONS PROCESSED",
            data: result,
            alreadyProcessed: false,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message,
        });
    }
});

export default router;
