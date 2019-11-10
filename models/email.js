const nodemailer = require('nodemailer');

function SendEmail(emailRecuperarSenha, res){

  token = new Date().getTime();
  console.log("token: "+token);
  console.log("email para recuperar senha: "+emailRecuperarSenha);
  urlComToken = "https://serve-barato.herokuapp.com/"+token;
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tabaratoUFT@gmail.com",
        pass: "projetodesistemas"
    }
  });
  
  const mailOptions = {
    //from: '"Ta Barato" <tabaratoUFT@gmail.com>',
    from: 'TaBarato <tabaratoUFT@gmail.com>',
    to: emailRecuperarSenha,
    subject: 'Recuperação de senha - TaBarato',
    html: '<html>Clique <a target="_black" href="'+urlComToken+'">neste link</a> para recuperar sua senha, este link irá expirar em 48 horas<br /><br /><br />Caso você não solicitou este serviço apenas ignore esta mensagem</html>'
  };

  transporter.sendMail(mailOptions).then(function(info){
    console.log('Email enviado: ' + info.response);
    res.status(200).send({success: true});
  }).catch(function(error){
    console.log(error);
    res.status(400).send({error: "Ocorreu um erro ao enviar um e-mail para recuperar sua senha"});
  });

}

module.exports = SendEmail;