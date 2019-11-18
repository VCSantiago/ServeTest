const mongoose = require('../database');

const PostSchema = new mongoose.Schema({
    autor: String,
    preco: Number,
    place: String,
    categoria: String,
    description: String,
    hastags: String,
    image: String,
    idUser: String,
    likes: {
        type: Number,
        default: 0
    },
    dataCriado: {
        type: Date,
        default: Date.now,
        required: false,
    },
    dataVencimento: {
        type: Date,
        default: Date.now,
        required: true,
    },
},{
    timestamps: true
});
module.exports = mongoose.model('Post', PostSchema);
