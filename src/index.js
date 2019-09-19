const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/*app.get('/', (req, res) =>{
    res.send('ok');
})*/
app.get('/teste', async(req, res) => {
    console.log("consegui");
    res.send({ok: true});
});

app.post('/register', async(req, res) => {
    console.log('aaaa');
    const {name, email, password} = req.body;
    console.log(email+""+name+""+password);
    res.send(email);
});
require('../controllers/authController')(app);
//require('../controllers/postController')(app);
//require('../controllers/projeto')(app);

app.listen(process.env.PORT || 3000);