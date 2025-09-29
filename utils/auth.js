const jwt = require("jsonwebtoken")
require("dotenv").config();

const isAuthenticated = (req, res, next) => {

      try {   
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' })

        }
        // console.log(authHeader);
        

        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Token missing' })
        }
        console.log(token);
        

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' })
        }
        // console.log(decoded);
        

        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized'})
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ROLE_ADMIN') {
        next()

    } else {
        return res.status(403).json({ message: 'Forbidden: Admins only' })
    }
}
module.exports = { isAuthenticated, isAdmin }