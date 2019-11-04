const express = require('express');
const Post = require('../models/post');
const auth = require('../midd/auth');
const router = express.Router();
router.use(auth);
router.get('/', async(req, res) => {
    const posts = await Post.find().sort('-createdAt');
    return res.json(posts);
});
module.exports = app => app.use('/post',router);
