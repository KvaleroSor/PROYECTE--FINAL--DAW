const authAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({
            mensaje: "❌ ERROR - USER DOESN´T EXIST | MIDDLEWARE",
        });
    }

    const role = req.user.role;

    console.log("👨🏽‍💼 USER ROLE: ", role);

    if (role !== "admin") {
        return res.status(403).json({
            mensaje: "❌ ERROR - NOT AN ADMIN USER | MIDDLEWARE",
            data: role
        });
    } else {
        console.log("✅ USUARIO ADMINISTRADOR VERIFICADO");
        next();
    }
};

export default authAdmin;
