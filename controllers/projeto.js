const express = require('express');
const router = express.Router();
const auth = require('../midd/auth');
router.get('/teste', (req, res) =>{
    res.send({ok: true});
});
module.exports = app => app.use('/projects', router);