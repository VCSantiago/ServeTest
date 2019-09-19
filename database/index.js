const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://santiago:santiago@cluster0-swqjv.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true,
useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose;