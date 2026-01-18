import { Router } from "express";
import getSavings from './../../functions/functions_savings/getSavings.js';
import auth from './../../middleware/auth.js';

const router = Router();

router.get("/", auth, async (req, res) => {
    try {
        console.log("👤 req.user:", req.user);
        const user_id = req.user?.userId;
        console.log("🆔 user_id extracted:", user_id);
        
        if (!user_id) {
            console.log("❌ ERROR - USER_ID IS UNDEFINED");
            return res.status(401).json({
                mensaje: "❌ ERROR - USER NOT AUTHENTICATED",
            });
        }
        
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
