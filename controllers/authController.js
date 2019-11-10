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
    console.log("veio");
    const {email} = req.body;
    try{
        if(await User.findOne({ email }))
            return res.status(400).send({error: 'Erroaqui'});
        const user = await User.create(req.body);
        user.senha = undefined;
        user.confirmarSenha = undefined;
        
        return res.send({
            user, 
            token: geraToken({id: user.id}),
        });
    }catch (err){
        console.log("aaa" +err);
        return res.status(400).send({error: 'Erroembaixo'});
    }

});
router.post('/autentica', async(req, res) =>{
    const {email, senha} = req.body;
    console.log(senha);
    console.log(email);
    const user = await User.findOne({ email }).select('+senha');
    if(!user)
        return res.status(400).send({error: 'Erroaqui'});
    if(!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({error: 'Erroaqui'});
    user.senha = undefined;
    res.send({
        user, 
        token: geraToken({id: user.id}),
    });
});



router.get("/recuperar", async(req, res) =>{

    //req.query - pega os parametros e entende eles como json
    const email = req.query.email;
    const user = await User.findOne({email: email}, function(err, result){
        if( err )
            res.status(500).send({error: 'Ocorreu um erro incomum'});
    });
    
    if( user == null )
        res.send({error: "Este e-mail não está cadastrado"});
    else
        Email(email, res);
    
});
router.get("/recuperar/:identificador", async(req, res) =>{
    
    //req.query - pega os parametros e entende eles como json
    const id = req.params.identificador;
    //verifica existencia do id no banco
    const resul = await User.findOne({recuperarSenha: id}, function(err, result){
        if(err)
            res.status(500).render("../HTML/Erro500.html");
    });
    if( resul != null && resul.recuperarSenha != null ){
        agora = new Date().getTime();
        if( agora > id+(1000*60*60*48) ){//add 48 hrs
            //remove do banco o id
            await User.updateOne({recuperarSenha: id}, {
                $set: {
                    recuperarSenha: null
                }
            }, (err, result) => {
                if(err)
                    res.status(500).render("../HTML/Erro500.html");
                res.render("../HTML/DataInvalida.html");
            });
        }else
            res.render("../HTML/ResetarSenha.html");
    }

});
router.post("/recuperar/:identificador", async(req, res) =>{

    //req.query - pega os parametros e entende eles como json
    const id = req.params.identificador;
    const senha = req.query.senha;
    const confirmarSenha = req.query.confirmarSenha;
    if( senha === confirmarSenha ){
        //verifica existencia do id no banco
        const resul = await User.findOne({recuperarSenha: id}, function(err, result){
            if(err)
                res.status(500).render("../HTML/Erro500.html");
        });
        if( resul != null && resul.recuperarSenha != null )
            //atualiza dados no banco de acordo com a senha e removendo o id
            await User.updateOne({recuperarSenha: id}, {
                $set: {
                    senha: senha,
                    recuperarSenha: null
                }
            }, (err, result) => {
                if(err)
                    res.status(500).render("../HTML/Erro500.html");
                res.render({success: "Senha alterada com sucesso"});
            });
        else
            res.send("Este link está inválido");
    }else
        res.send("As senhas não correspondem");
    
});
module.exports = (app) => app.use('/auth', router);
