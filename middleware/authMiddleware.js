const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from "Bearer <token>"
    if (!token) return res.status(401).send("Access token is missing!");

    try {
        const decoded = jwt.verify(token, "your_secret_key"); // Replace with your secret key
        req.user = decoded; // Attach user info to the request
        next();
    } catch (err) {
        res.status(401).send("Invalid or expired token!");
    }
};

module.exports = authMiddleware;
