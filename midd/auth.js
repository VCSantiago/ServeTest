const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({erros: "SEm auto"});
    }
    const parte = authHeader.split(' ');
    if(!parte.length === 2)
        return res.status(401).send({erros: "SEm "});

    const [scheme, token] = parte;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({erros: "Errado "});
    
    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err) return res.status(401).send({erros: "Errado "});
        req.userId = decoded.id;
        return next();
       
    });

};