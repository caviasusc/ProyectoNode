const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    let token = req.header('auth-token');
    if (!token){ 
        token = req.query.token

        if (!token) return res.status(401).json({ error: 'acceso denegado' })
    }

    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verificar
        next()
    } catch {
        res.status(401).json({ error: 'acceso denegado' })
    }
}
module.exports = verifyToken