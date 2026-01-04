import { Router } from "express";
import postCategory from "../../functions/functions_categories/postCategory.js";
import auth from './../../middleware/auth.js';

const router = Router();

//Passem amb el middleware "Auth" el token d´autenticació de l´usuari que está verificat.
router.post("/", auth, async (req, res) => {
    try {
        const { name, monthly_budget, category_type, total_acumulated, color, icon } = req.body;
        const userIdFromToken = req.user.userId; // Gastar el userId del token decodificat.

        if (!userIdFromToken) {
            console.log("❌ ERROR - YOU DON´T HAVE PERMISSIONS | SERVER");
            return res.status(401).json({ error: "User ID missing from token" });
        }

        const dataNewCategory = {
            name: name,
            monthly_budget: monthly_budget,
            category_type: category_type,
            total_acumulated: total_acumulated,
            color: color,
            icon: icon,
            user_id: userIdFromToken // Tinguem que gastar el user_id del token
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
