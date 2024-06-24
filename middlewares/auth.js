const jwt = require('jsonwebtoken');
const { promisify } = require('util');

async function auth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Unauthorized. You must log in first." });
    }

    try {
        const decoded = await promisify(jwt.verify)(authorization, process.env.JWT_SECRET);
        req.id = decoded.data.id;
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
    next();
}

module.exports = { auth };
