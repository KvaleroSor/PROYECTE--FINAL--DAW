import express from "express";
import getContributionHistory from "../../functions/functions_savings/getContributionHistory.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

router.get("/contribution-history", auth, async (req, res) => {
    try {
        const user_id = req.user?.userId;

        if (!user_id) {
            return res.status(400).json({
                mensaje: "❌ - USER ID REQUIRED"
            });
        }

        const result = await getContributionHistory(user_id);
        
        res.status(200).json({
            mensaje: "✅ - CONTRIBUTION HISTORY RETRIEVED",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            mensaje: "❌ - ERROR GETTING CONTRIBUTION HISTORY",
            error: err.message
        });
    }
});

export default router;
