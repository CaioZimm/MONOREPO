const redisClient = require('../../config/redis')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')

    if(!token || !token.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Acesso negado, usuário não autenticado.'})
    }

    try {
        const blackList = await redisClient.get(`blacklist:${token.replace('Bearer ', '')}`);

        if (blackList){
            return res.status(401).json({ message: "Token inválido ou expirado."})
        }

        const verify = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verify;

        next();

    } catch (error) {
        return res.status(400).json({ error: 'Token inválido' })
    }
}