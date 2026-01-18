import { Router } from "express";
import postSpendPercentage from "./../../functions/functions_percentage_spends/postPercentageSpend.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const user_id = req.user?.userId;
        const reqSpendPercentage = { ...req.body, user_id };
        const { spend, leisureSpend, saving, inversion } = req.body;
        const TOTAL = spend + leisureSpend + saving + inversion;

        if (!user_id || !spend || !leisureSpend || !saving || !inversion) {
            console.log(
                "❌ ERROR - SOME ELEMENT OF THE NEW SPEND PERCENTAGE IS EMPTY | SERVER"
            );
            res.status(204).send();
        }

        if ( TOTAL > 100 || TOTAL < 100) {
            console.log(
                `❌ ERROR - PERCENTAGE OF SPEND IS NOT EQUAL TO 100 | ${TOTAL} % | SERVER`
            );
            return res.status(400).json({
                mensaje:
                    `❌ ERROR - PERCENTAGE OF SPEND IS NOT EQUAL TO 100 | ${TOTAL} % | SERVER`
            });
        }

        const resultNewSpendPercentage = await postSpendPercentage(
            reqSpendPercentage
        );

        res.status(201).json({
            mensaje: "✅ - THE SPEND PERCENTAGE HAS BEEN CREATED",
            data_recived: reqSpendPercentage,
            new_spend: resultNewSpendPercentage,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVIDOR`,

            error: err.mensage,
        });
    }
});

export default router;
