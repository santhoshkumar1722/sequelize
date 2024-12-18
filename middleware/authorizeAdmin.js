const db = require("../models");
const User = db.user;

const authorizeAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(403).send("User information is missing or invalid!");
        }

        // Fetch the user details from the database
        const user = await User.findByPk(req.user.id); // `id` is extracted from the token payload
        if (!user) {
            return res.status(404).send("User not found!");
        }

        // Check if the user's role is 'admin'
        if (user.user_role !== 'admin') {
            console.log("Access denied for user:", user.username, "Role:", user.user_role);
            return res.status(403).send("Access denied. Admins only!");
        }

        // Attach user details to the request for further use if needed
        req.userDetails = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in authorizeAdmin middleware:", error);
        res.status(500).send("Internal server error!");
    }
};

module.exports = authorizeAdmin;

