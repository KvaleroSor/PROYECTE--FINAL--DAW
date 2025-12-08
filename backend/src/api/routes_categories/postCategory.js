import { Router } from "express";
import postCategory from "../../functions/functions_categories/postCategory.js";
import auth from './../../middleware/auth.js';

const router = Router();

router.post("/", auth, async (req, res) => {
    try {
        const { name, color, icon, user_id } = req.body;
        // const { userIdToken } = req.user.user_id;

        console.log("🧟‍♂️ USER ID TOKEN: ", req.user.user_id);

        console.log("📝 DATA RECEIVED:", req.body);
        console.log("👤 USER ID EXTRACTED:", user_id);
        console.log("🎛️ TOKEN", req,headers);

        if (!user_id) {
            console.log("❌ ERROR - YOU DON´T HAVE PERMISSIONS | SERVER");
            return res.status(401).json({ error: "User ID missing" });
        }

        const dataNewCategory = {
            name: name,
            color: color,
            icon: icon,
            user_id: user_id 
        }

        const resultNewCategory = await postCategory(dataNewCategory);
        console.log("✅ NEW CATEGORY CREATED:", resultNewCategory);

        res.status(201).json({
            mensaje: "✅ - THE CATEGORY HAS BEEN CREATED",
            data_recived: dataNewCategory,
            new_category: resultNewCategory,
            user_id_saved: resultNewCategory.user_id,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - THE CATEGORY HAS NOT BEEN CREATED | SERVIDOR`,
            error: err.message,
        });
    }
});

export default router;
