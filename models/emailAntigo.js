const nodemailer = require('nodemailer');

function SendEmail(emailRecuperarSenha){

    data = new Date();
    //token = ""+data.getFullYear()+(data.getMonth()+1)+data.getDate()+data.getHours()+data.getMinutes()+data.getSeconds()+data.getMilliseconds();
    token = new Date().getTime();
    console.log("token: "+token);
    urlComToken = "/"+token;

    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,//587
      secure: false, // true for 465, false for other ports
      auth: {
          user: "998748ebecbc0c",
          pass: "2b62a025ef8f98"
      },
      tls: { rejectUnauthorized: false }
    });
    
    const mailOptions = {
      from: 'no-reply@tabarato.com',
      to: emailRecuperarSenha+"",
      subject: 'Recuperação de senha - TaBarato',
      text: 'teste'
      //html: '<html>Clique no link abaixo para recuperar sua senha, este link irá expirar em 48 horas<br /><a target="_black" href="'+urlComToken+'" /><br /><br />Caso você não solicitou este serviço apenas ignore esta mensagem</html>'
    };

    console.log(mailOptions);
    
    a = 1;

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        a = false;
      } else {
        console.log('Email enviado: ' + info.response);
        a = true;
      }
    });

    return a;
    
}

module.exports = SendEmail;