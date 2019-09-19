const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/agoravai', {useUnifiedTopology: true,
useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose;