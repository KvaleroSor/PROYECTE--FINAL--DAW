import { Router } from "express";
import postSaving from './../../functions/functions_savings/postSaving.js';
import auth from './../../middleware/auth.js';

const router = Router();

router.post("/", auth, async (req, res) => {
    try {
        const user_id = req.user?.userId;
        const reqSaving = { ...req.body, user_id };

        console.log("➡️ DATA RECEIVED IN SERVER:", reqSaving);

        if (!user_id || !reqSaving.goal_name || !reqSaving.target_amount || !reqSaving.percentage_allocation) {
            return res.status(400).json({
                mensaje: "❌ ERROR - MISSING REQUIRED FIELDS | SERVER"
            });
        }

        const resultNewSaving = await postSaving(reqSaving);

        res.status(201).json({
            mensaje: "✅ - THE SAVING GOAL HAS BEEN CREATED",
            data_received: reqSaving,
            data_created: resultNewSaving
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message,
        });
    }
});

export default router;
