const express = require('express');
const router = express.Router();
const auth = require('../midd/auth');
router.use(auth);
router.get('/teste', (req, res) =>{
    console.log("veio");
    res.send({ok: true});
});
module.exports = app => app.use('/projects', router);