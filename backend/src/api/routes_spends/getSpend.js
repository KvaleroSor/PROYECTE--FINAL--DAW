import { Router } from "express";
import getSpend from './../../functions/functions_spends/getSpend.js';
import auth from './../../middleware/auth.js';

const router = Router();

router.get("/user", auth, async (req, res) => {
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
        
        const resultGet = await getSpend(user_id);

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SPENDS HAVE NOT BEEN FOUNDED | SERVER",
              })
            : res.status(201).json({
                  mensaje: "✅ - THE SPENDS HAVE BEEN FOUNDED",
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
