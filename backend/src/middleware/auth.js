import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const tokenAutentication = req.headers.authorization;

    if (!tokenAutentication || !tokenAutentication.startWith("Bearer")) {
        return res.status(401).json({
            mensaje: "❌ ERROR - NO AUTHORIZATION",
        });
    }

    const token = tokenAutentication.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: "❌ ERROR - TOKEN INVALID OR EXPIRED | SERVER" });
    }
};

export default auth;