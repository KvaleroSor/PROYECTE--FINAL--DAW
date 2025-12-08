import { Router } from "express";
import postCategory from "../../functions/functions_categories/postCategory.js";
import auth from './../../middleware/auth.js';

const router = Router();

router.post("/", auth, async (req, res) => {
    try {
        const { name, color, icon } = req.body;
        const userIdFromToken = req.user.userId; // Usar 'userId' del token decodificado

        console.log("🧟‍♂️ USER ID FROM TOKEN: ", userIdFromToken);
        console.log("📝 DATA RECEIVED:", req.body);
        console.log("🎛️ HEADERS:", req.headers.authorization);

        if (!userIdFromToken) {
            console.log("❌ ERROR - YOU DON´T HAVE PERMISSIONS | SERVER");
            return res.status(401).json({ error: "User ID missing from token" });
        }

        const dataNewCategory = {
            name: name,
            color: color,
            icon: icon,
            user_id: userIdFromToken // Usar el user_id del token, no del body
        }

        const resultNewCategory = await postCategory(dataNewCategory);
        console.log("✅ NEW CATEGORY CREATED:", resultNewCategory);

        res.status(201).json({
            mensaje: "✅ - THE CATEGORY HAS BEEN CREATED",
            data_recived: dataNewCategory,
            new_category: resultNewCategory,
            user_id_saved: userIdFromToken,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - THE CATEGORY HAS NOT BEEN CREATED | SERVIDOR`,
            error: err.message,
        });
    }
});

export default router;
