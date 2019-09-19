const Post = require('../models/post');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const express = require('express');
const auth = require('../midd/auth');
const router = express.Router();
router.use(auth);

router.post('/', async(req, res) => {
    const users = await User.findById(req.userId);

    const post = await Post.create(req.body);
   
    post.idUser = req.userId;
    var a =users.name;
    return res.send({post, nome: a});
});
module.exports = app => app.use('/post', router);
