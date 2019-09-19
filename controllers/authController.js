const express = require('express');
const User = require('../models/user');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

function geraToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}
router.post('/register', async(req, res) => {
    const {name, email, password} = req.body;
    try{
        if(await User.findOne({ email }))
            return res.status(400).send({error: 'Erroaqui'});
        const user = await User.create(req.body);
        user.password = undefined;
        return  res.send({
            user, 
            token: geraToken({id: user.id}),
        });
    }catch (err){
        console.log("aaa" +err);
        return res.status(400).send({error: 'Erroembaixo'});
    }

});
router.post('/autentica', async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({ email }).select('+password');
    if(!user)
        return res.status(400).send({error: 'Erroaqui'});
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Erroaqui'});
    user.password = undefined;
    res.send({
        user, 
        token: geraToken({id: user.id}),
    });
});
module.exports = (app) => app.use('/auth', router);
