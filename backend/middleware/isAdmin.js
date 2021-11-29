var jwt = require('jsonwebtoken');
const JWT_SECRET = "Mart@1999";

const isAdmin = (req, res, next) => {
    const token = req.header('auth-token');
    try {
        if (!token) {
            return res.status(401).json({ error: "Please authenticate" });
        } else {
            const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user
            console.log(data.user)
        }
    } catch (error) {
        return res.status(401).send({ error: "Please Authenticate" });
    }
    next()
}

module.exports = isAdmin;

