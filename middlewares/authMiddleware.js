const jwt = require("jsonwebtoken")
const User = require("../models/User")


const requireAuth = async (req, res, next) => {
    const token = req.header.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Auth token missing" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password");
        next()
    } catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }

}


module.exports = requireAuth