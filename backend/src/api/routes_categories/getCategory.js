import { Router } from "express";
import getCategory from "../../functions/functions_categories/getCategory.js";
import auth from "./../../middleware/auth.js";

const router = Router();

router.get("/", auth, async (req, res) => {
    try {
        const user_id = req.user?.userId;
        console.log("📋 GET CATEGORIES - User ID from token:", user_id);

        const resultGet = await getCategory(user_id);

        const categories = resultGet || [];

        res.status(200).json({
            mensaje: "✅ - THE CATEGORIES HAVE BEEN FOUND",
            data: categories,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message,
        });
    }
});

export default router;
