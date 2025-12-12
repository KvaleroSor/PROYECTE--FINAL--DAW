import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    console.log("🔐 AUTH MIDDLEWARE CALLED");
    console.log("🎫 Authorization Header:", req.headers.authorization);
    console.log("🔑 JWT_SECRET EXISTS:", !!process.env.JWT_SECRET);
    
    const tokenAutentication = req.headers.authorization;

    if (!tokenAutentication || !tokenAutentication.startsWith("Bearer")) {
        console.log("❌ NO AUTHORIZATION TOKEN");
        return res.status(401).json({
            mensaje: "❌ ERROR - NO AUTHORIZATION",
        });
    }

    const token = tokenAutentication.split(" ")[1];
    console.log("🎯 Token extracted:", token ? "EXISTS" : "MISSING");

    try {
        if (!process.env.JWT_SECRET) {
            console.log("❌ JWT_SECRET MISSING IN AUTH");
            throw new Error("JWT_SECRET not configured");
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token decoded successfully:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("💥 AUTH ERROR:", err.message);
        return res.status(401).json({ 
            mensaje: "❌ ERROR - TOKEN INVALID OR EXPIRED | SERVER" 
        });
    }
};

export default auth;